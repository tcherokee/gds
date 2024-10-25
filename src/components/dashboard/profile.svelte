<script lang="ts">
  import UserPlaceholderSvg from "~icons/kensho-dashboard-icons/user-placeholder";
  import UploadCloud2Svg from "~icons/kensho-icons/upload-cloud";
  import Dropzone from "svelte-file-dropzone";
  import { user } from "../../../stores/authStore";
  import type { TUser } from "../../../interfaces/auth";
  import { onMount } from "svelte";
  import type { TranslationData } from "../../../interfaces/common/types";
  import { toast } from "svoast";

  let userProfile: TUser;
  let userProfileLoader = true;
  export let translations: TranslationData;

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
  let userAvatarMode: "AVATAR" | "NEW_IMAGE" = "AVATAR";
  let preloadedAvatarList: {
    avatar: {
      url: string;
      id: number;
    };
  }[] = [];

  //   DOM Related
  let avatarDialog: HTMLDialogElement;
  let previewImg: HTMLImageElement;
  let selectedAvatarImageId: number;

  const userAvatarModeSelectionHandler = (mode: "AVATAR" | "NEW_IMAGE") => {
    if (userAvatarMode !== mode) {
      userAvatarMode = mode;
    }
  };

  const showUserAvatarDialog = async () => {
    avatarDialog?.showModal();
    document.body.style.overflow = "hidden";
  };

  const closeUserAvatarDialog = () => {
    selectedAvatarImageId = 0;
    previewImg.src = $user?.photo ? $user?.photo.url + "" : "";
    avatarDialog.close();
    document.body.style.overflow = "";
  };

  const userAvatarHandler = () => {
    avatarDialog = document.querySelector("#avatarDialog") as HTMLDialogElement;
    previewImg = document.getElementById("previewImg") as HTMLImageElement;
    // Listen for Esc key press
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && avatarDialog.open) {
        closeUserAvatarDialog();
      }
    });
  };

  onMount(async () => {
    getUserProfileHandler();
    userAvatarHandler();
    const avatarsRes = await fetch(
      `${import.meta.env.PUBLIC_FULL_URL}/api/dashboard/user-avatars/`
    );
    if (avatarsRes.ok) {
      const userAvatars = await avatarsRes.json();
      preloadedAvatarList = userAvatars.data;
    }
  });

  // Handle User Profile
  const getUserProfileHandler = async () => {
    userProfileLoader = true;
    const res = await fetch(
      `${import.meta.env.PUBLIC_FULL_URL}/api/dashboard/user/`
    );
    if (res.ok) {
      userProfile = await res.json();
      user.set({ ...userProfile });
      userFirstName = userProfile.firstName;
      userLastName = userProfile.lastName;
      userBio = userProfile.bio;
      userPhoto = userProfile.photo?.url;
      userCoverImage = userProfile.cover_image?.url;
      previewImg.src = $user?.photo ? $user?.photo?.url + "" : "";
    }
    userProfileLoader = false;
  };

  // Select an avatar
  const selectAvatar = (avatar: string, avatarId: number) => {
    previewImg.src = avatar;
    selectedAvatarImageId = avatarId;
  };

  const handleAvatarFileSelect = (e: any) => {
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

    if (avatarFile) {
      if ($user?.photo) {
        fetch(
          `${import.meta.env.PUBLIC_FULL_URL}/api/dashboard/delete-user-image/?` +
            new URLSearchParams(`id=${$user?.photo?.id}`),
          {
            method: "DELETE",
          }
        );
      }
      const formData = new FormData();
      formData.append("files", avatarFile, `avatar-${userProfile.id}`);
      formData.append("path", "users/avatar");
      formData.append("ref", "plugin::users-permissions.user");
      formData.append("refId", `${userProfile.id}`);
      formData.append("field", "photo");
      const response = await fetch(
        `${import.meta.env.PUBLIC_FULL_URL}/api/dashboard/update-user-image/`,
        {
          method: "POST",
          body: formData,
        }
      );
      const responseData = await response.json();
      if (Array.isArray(responseData)) {
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
          `${import.meta.env.PUBLIC_FULL_URL}/api/dashboard/delete-user-image/?` +
            new URLSearchParams(`id=${$user?.cover_image.id}`),
          {
            method: "DELETE",
          }
        );
      }
      const response = await fetch(
        `${import.meta.env.PUBLIC_FULL_URL}/api/dashboard/update-user-image/`,
        {
          method: "POST",
          body: formData,
        }
      );
      const responseData = await response.json();
      if (Array.isArray(responseData)) {
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
      await updateUserProfile(userUpdatePayload);
    }

    toast.success(translations.profileUpdateSuccessToast);
    updateProfileLoader = false;
  };

  const updateUserProfile = async (payload: any) => {
    const response = await fetch(
      `${import.meta.env.PUBLIC_FULL_URL}/api/dashboard/user/`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      }
    );
    const responseData = await response.json();
    if (responseData?.id) {
      user.set({
        ...($user as TUser),
        firstName: responseData.firstName,
        lastName: responseData.lastName,
        bio: responseData.bio,
      });
    }
  };

  const avatarUpdateHandler = async () => {
    if (userAvatarMode === "AVATAR") {
      await updateUserAvatar();
    } else {
      await updateProfileHandler();
    }
    closeUserAvatarDialog();
  };

  const updateUserAvatar = async () => {
    updateProfileLoader = true;
    await updateUserProfile({ photo: selectedAvatarImageId });
    getUserProfileHandler();
    updateProfileLoader = false;
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
        if (type === "PROFILE") {
          avatar = result as string;
          previewImg.src = avatar;
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
              {#if $user?.photo || userPhoto}
                <img
                  class="w-full h-full object-cover rounded-full"
                  src={$user?.photo?.url || userPhoto}
                  alt={userProfile?.firstName + " avatar"}
                />
              {:else}
                <UserPlaceholderSvg class="w-[100px] h-[100px]" />
              {/if}
            </div>
            <div
              class="relative w-full px-6 py-4 rounded-xl border border-[#EAECF0] cursor-pointer"
            >
              <button
                class="absolute top-0 left-0 w-full h-full opacity-0 z-30"
                on:click={showUserAvatarDialog}
              ></button>
              <div class="text-sm text-black text-center">
                {translations.editAvatar}
              </div>
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
              <!-- <div class="text-sm text-black text-center">
                <span class="text-purple-500 font-bold">Click to upload</span>
                or drag and drop<br /> SVG, PNG, JPG or GIF (max. 800x400px)
              </div> -->
              <div class="text-sm text-black text-center">
                <span class="text-purple-500 font-bold"
                  >{translations.clickToUpload}</span
                >
                {translations.dragAndDrop}<br /> SVG, PNG, JPG or GIF (max. 800x400px)
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
                >{updateProfileLoader
                  ? translations.pleaseWait + "..."
                  : translations.saveChanges}</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<dialog class="avatar-dialog rounded-xl min-h-[478px]" id="avatarDialog">
  <div class="h-full flex flex-col justify-between">
    <div class="p-4 space-y-5">
      <div class="text-lg font-bold !text-blue-700">{translations.avatarImage}</div>
      <div class="tabs flex justify-between mb-2.5">
        <div
          class={`tab cursor-pointer p-2.5 bg-[#f0f0f0] rounded-[5px] mr-[5px] ${userAvatarMode === "AVATAR" ? "!bg-[#007bff] text-white" : ""}`}
          on:click={() => {
            userAvatarModeSelectionHandler("AVATAR");
          }}
        >
          {translations.preloadedAvatars}
        </div>
        <div
          class={`tab cursor-pointer p-2.5 bg-[#f0f0f0] rounded-[5px] mr-[5px] ${userAvatarMode === "NEW_IMAGE" ? "!bg-[#007bff] text-white" : ""}`}
          on:click={() => {
            userAvatarModeSelectionHandler("NEW_IMAGE");
          }}
        >
          {translations.uploadYourOwn}
        </div>
      </div>

      <div class={`${userAvatarMode === "AVATAR" ? "block" : "hidden"}`}>
        <div class="avatars flex flex-wrap gap-2.5 min-h-[120px]">
          {#each preloadedAvatarList as preloadedAvatarItem, index}
            <img
              class={`w-[60px] h-[60px] rounded-full cursor-pointer border-[2px] border-transparent transition-border duration-300 ${preloadedAvatarItem.avatar.id === selectedAvatarImageId ? "!border-[#007bff]" : ""}`}
              src={preloadedAvatarItem.avatar.url}
              alt={`Preloaded avatar ${preloadedAvatarItem.avatar.id}`}
              on:click={() =>
                selectAvatar(
                  preloadedAvatarItem.avatar.url,
                  preloadedAvatarItem.avatar.id
                )}
            />
          {/each}
        </div>
      </div>

      <div class={`${userAvatarMode === "NEW_IMAGE" ? "block" : "hidden"}`}>
        <div class="flex justify-center">
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
              <span class="text-purple-500 font-bold"
                >{translations.clickToUpload}</span
              >
              {translations.dragAndDrop}<br /> SVG, PNG, JPG or GIF (max. 800x400px)
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5 w-full text-center" id="avatarPreview">
        <p>{translations.avatarPreview}</p>
        {#if !previewImg?.getAttribute("src")}
          <div
            class="mx-auto w-20 h-20 flex justify-center items-center mx-auto rounded-full bg-purple-700"
          >
            <UserPlaceholderSvg class="w-18 h-18" />
          </div>
        {/if}
        <img
          class={`mx-auto w-20 h-20 rounded-full object-cover ${previewImg?.getAttribute("src") ? "block" : "hidden"}`}
          bind:this={previewImg}
          alt="Preview"
          id="previewImg"
        />
      </div>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
      <button
        type="button"
        class="register-btn inline-flex w-full justify-center items-center px-3 py-2 sm:ml-3 sm:w-auto"
        disabled={!selectedAvatarImageId && userAvatarMode === "AVATAR"
          ? true
          : !avatar && userAvatarMode === "NEW_IMAGE"
            ? true
            : false}
        on:click={avatarUpdateHandler}
      >
        {#if updateProfileLoader}
          <span class="custom-spinner mr-2" aria-hidden="true" />
        {/if}
        <span>{updateProfileLoader ? translations.pleaseWait+"..." : translations.submitForm}</span>
      </button>
      <button
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        on:click={closeUserAvatarDialog}>{translations.cancel}</button
      >
    </div>
  </div>
</dialog>

<style lang="scss">
  .avatar-dialog {
    width: min(95vw, 400px);
    max-height: min(660px, 90vh);
    &::backdrop {
      backdrop-filter: blur(10px); /* Apply blur effect */
      background-color: rgba(0, 0, 0, 0.5); /* Optional: darken the backdrop */
    }

    button {
      &.register-btn[disabled] {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
  }
</style>
