<script lang="ts">
  import UserPlaceholderSvg from "~icons/kensho-dashboard-icons/user-placeholder";
  import UploadCloud2Svg from "~icons/kensho-icons/upload-cloud";
  import Dropzone from "svelte-file-dropzone";
  import { user } from "../../../stores/authStore";
  import type { TUser } from "../../../interfaces/auth";
  import { onMount } from "svelte";

  let userProfile: TUser;
  let userProfileLoader = true;
  export let translations: { [key: string]: string };

  let updateProfileLoader = false;
  let userFirstName: string;
  let userLastName: string;
  let userBio: string;
  let userPhoto: string;
  let userCoverImage: string;

  let avatar = "";
  let coverImage = "";
  let avatarFile: File;
  let coverImageFile: File;

  onMount(async () => {
    userProfileLoader = true;
    const res = await fetch(`/api/dashboard/user`);
    if (res.ok) {
      userProfile = await res.json();
      console.log("UP", userProfile);
      userFirstName = userProfile.firstName;
      userLastName = userProfile.lastName;
      userBio = userProfile.bio;
      userPhoto = userProfile.photo?.url;
      userCoverImage = userProfile.cover_image?.url;
    }
    userProfileLoader = false;
  });

  const handleAvatarFileSelect = (e: any) => {
    console.log(e);
    const { acceptedFiles } = e.detail;
    avatarFile = acceptedFiles[0];
    readUrl(avatarFile, "PROFILE");
  };

  const handleCoverImageFileSelect = (e: any) => {
    const { acceptedFiles } = e.detail;
    coverImageFile = acceptedFiles[0];
    readUrl(coverImageFile, "COVER");
  };

  const updateProfileHandler = async () => {
    updateProfileLoader = true;
    // console.log(data);

    if (avatarFile) {
      if ($user?.photo) {
        fetch(
          `/api/dashboard/delete-user-image?` +
            new URLSearchParams(`id=${$user?.photo.id}`),
          {
            method: "DELETE",
          }
        );
      }
      // return;
      const formData = new FormData();
      formData.append("files", avatarFile, `avatar-${userProfile.id}`);
      formData.append("path", "users/avatar");
      formData.append("ref", "plugin::users-permissions.user");
      formData.append("refId", `${userProfile.id}`);
      formData.append("field", "photo");
      const response = await fetch(`/api/dashboard/update-user-image`, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      if (Array.isArray(responseData)) {
        console.log(responseData?.[0]);
        user.set({
          ...($user as TUser),
          photo: {
            id: responseData?.[0].id,
            url: responseData[0].url,
          },
        });
      }
    }

    if (coverImageFile) {
      const formData = new FormData();
      formData.append("files", coverImageFile, `cover-${userProfile.id}`);
      formData.append("path", "users/cover");
      formData.append("ref", "plugin::users-permissions.user");
      formData.append("refId", `${userProfile.id}`);
      formData.append("field", "cover_image");

      if ($user?.cover_image) {
        fetch(
          `/api/dashboard/delete-user-image?` +
            new URLSearchParams(`id=${$user?.cover_image.id}`),
          {
            method: "DELETE",
          }
        );
      }
      const response = await fetch(`/api/dashboard/update-user-image`, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      if (Array.isArray(responseData)) {
        console.log(responseData?.[0]);
        user.set({
          ...($user as TUser),
          cover_image: {
            id: responseData?.[0].id,
            url: responseData[0].url,
          },
        });
      }
    }

    if (
      $user?.firstName !== userFirstName ||
      $user?.lastName !== userLastName ||
      $user?.bio !== userBio
    ) {
      const userUpdatePayload = {
        firstName: userFirstName,
        lastName: userLastName,
        bio: userBio,
      };
      const response = await fetch(`/api/dashboard/user`, {
        method: "PATCH",
        body: JSON.stringify(userUpdatePayload),
      });
      const responseData = await response.json();
      if (responseData?.id) {
        user.set({
          ...($user as TUser),
          firstName: responseData.firstName,
          lastName: responseData.lastName,
          bio: responseData.bio,
        });
      }
    }

    updateProfileLoader = false;
    // toast.success(translations.profileUpdateSuccessToast);
  };

  const avatarChangeHandler = (event: any) => {
    avatarFile = event.target.files[0];
    readUrl(avatarFile, "PROFILE");
  };

  const coverImageChangeHandler = (event: any) => {
    coverImageFile = event.target.files[0];
    readUrl(coverImageFile, "COVER");
  };

  const readUrl = (file: File, type: "PROFILE" | "COVER") => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = (e.target as FileReader).result;
        console.log(type);
        if (type === "PROFILE") {
          avatar = result as string;
        } else {
          coverImage = result as string;
        }
      };

      reader.readAsDataURL(file);
    }
  };
</script>

<div class="">
  <h1 class="text-xl text-white font-bold !font-lato mb-[14px]">
    {translations.editProfile}
  </h1>
  <div class="dashboard-glass-wrapper p-3">
    <div
      class="rounded-xl gap-x-8 bg-[#DCE9F3] p-3 shadow-[0px_0px_12px_0px_rgba(63,230,252,0.60)] backdrop-blur-[6px] border border-[rgba(255,255,255,0.30)] md:flex"
    >
      <div class="w-[280px] shrink-0">
        <h2 class="text-xl text-blue-900 font-bold">
          {translations.personalInfo}
        </h2>
        <p class="text-sm text-bluee-500">
          {translations.profileUpdatePageSubtitle}
        </p>
      </div>
      <div
        class="w-full p-6 space-y-6 bg-white rounded-xl border border-[#EAECF0] shadow-[0px_1px_2px_0px-rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)]"
      >
        <div class="gap-x-6 md:flex">
          <div class="w-full md:w-1/2">
            <label
              for="firstName"
              class="block text-blue-500 text-sm font-medium mb-[6px]"
              >{translations.firstName}</label
            >
            <div class="mt-2">
              <input
                class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-background-700"
                id="firstName"
                name="firstName"
                type="text"
                bind:value={userFirstName}
                placeholder="Enter your first name"
                required
              />
            </div>
          </div>
          <div class="w-full md:w-1/2">
            <label
              for="lastName"
              class="block text-blue-500 text-sm font-medium mb-[6px]"
              >{translations.lastName}</label
            >
            <div class="mt-2">
              <input
                class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-background-700"
                id="lastName"
                name="lastName"
                type="text"
                bind:value={userLastName}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>
        </div>
        <div class="gap-x-6 md:flex">
          <div class="w-full space-y-4 md:w-1/2">
            <div
              class="w-[128px] h-[128px] flex justify-center items-center mx-auto rounded-full bg-purple-700"
            >
              {#if avatar || userPhoto}
                <img
                  class="w-full h-full object-cover rounded-full"
                  src={avatar ? avatar : userPhoto}
                  alt={userProfile.firstName + " avatar"}
                />
              {:else}
                <UserPlaceholderSvg class="w-[100px] h-[100px]" />
              {/if}
            </div>
            <div
              class="relative w-full px-6 py-4 rounded-xl border border-[#EAECF0] cursor-pointer"
            >
              <Dropzone
                containerClasses="absolute top-0 left-0 w-full h-full opacity-0 z-30"
                on:drop={handleAvatarFileSelect}
                accept="image/*"
                multiple={false}
              />
              <div
                class="w-10 h-10 flex justify-center items-center mx-auto rounded-full border-[6px] border-[#F9FAFB] bg-[#F2F4F7]"
              >
                <UploadCloud2Svg class="w-5 h-5" />
              </div>
              <div class="text-sm text-black text-center mt-3">
                <span class="text-purple-500 font-bold">Click to upload</span>
                or drag and drop<br /> SVG, PNG, JPG or GIF (max. 800x400px)
              </div>
              <!-- <input
								class="cursor-pointer z-10 absolute top-0 opacity-0 h-full w-full"
								type="file"
								name="profileImage"
								accept="image/*"
								on:change={avatarChangeHandler.bind(this)}
							/> -->
            </div>
          </div>
          <div class="w-full space-y-4 md:w-1/2">
            <div
              class="w-full h-[128px] max-w-[324px] mx-auto rounded-xl {!userCoverImage
                ? 'bg-cover-image-wrapper no-repeat bg-cover'
                : ''}"
            >
              {#if coverImage || userCoverImage}
                <img
                  class="w-full h-full object-cover rounded-xl"
                  src={coverImage ? coverImage : userCoverImage}
                  alt={userProfile.firstName + " cover image"}
                />
              {/if}
            </div>
            <div
              class="relative w-full px-6 py-4 space-y-3 rounded-xl border border-[#EAECF0] cursor-pointer"
            >
              <div
                class="w-10 h-10 flex justify-center items-center mx-auto rounded-full border-[6px] border-[#F9FAFB] bg-[#F2F4F7]"
              >
                <UploadCloud2Svg class="w-5 h-5" />
              </div>
              <div class="text-sm text-black text-center">
                <span class="text-purple-500 font-bold">Click to upload</span>
                or drag and drop<br /> SVG, PNG, JPG or GIF (max. 800x400px)
              </div>
              <Dropzone
                containerClasses="absolute top-0 left-0 w-full h-full opacity-0 z-30"
                on:drop={handleCoverImageFileSelect}
                accept="image/*"
                multiple={false}
              />
              <!-- <input
								class="cursor-pointer z-10 absolute top-0 opacity-0 h-full w-full"
								type="file"
								name="coverImage"
								accept="image/*"
								on:change={coverImageChangeHandler.bind(this)}
							/> -->
            </div>
          </div>
        </div>

        <div>
          <label
            for="bioDesc"
            class="block text-blue-500 text-sm font-medium mb-[6px]"
            >{translations.bioDescription}</label
          >
          <div class="mt-2">
            <textarea
              class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-background-700"
              id="bioDesc"
              name="userBio"
              bind:value={userBio}
              rows={5}
            />
          </div>
        </div>

        <div class="-mx-6">
          <div
            class="flex justify-end items-center pt-4 px-6 border-t border-t-[#CED4DA]"
          >
            <button
              type="button"
              class="register-btn flex w-fit justify-center items-center px-3 py-[7px]"
              on:click={updateProfileHandler}
            >
              {#if updateProfileLoader}
                <span class="custom-spinner mr-2" aria-hidden="true" />
              {/if}
              <span
                >{updateProfileLoader ? "Please wait..." : "Save changes"}</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
