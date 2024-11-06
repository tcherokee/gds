<script lang="ts">
  import UserPlaceholderSvg from "~icons/kensho-dashboard-icons/user-placeholder";
  import UploadCloud2Svg from "~icons/kensho-icons/upload-cloud";
  import Dropzone from "svelte-file-dropzone";
  import { onMount } from "svelte";
  import { toast } from "svoast";
  import { user, getUserProfile } from "../../../stores/authStore";

  export let translations: TranslationData;
  let updateProfileLoader = false;
  let userAvatarMode: "AVATAR" | "NEW_IMAGE" = "AVATAR";
  let avatar = "";

  //   DOM Related
  let avatarModal: HTMLDialogElement;
  let previewImg: HTMLImageElement;
  let selectedAvatarImageId: number;
  let preloadedAvatarList: {
    avatar: {
      url: string;
      id: number;
    };
  }[] = [];

  onMount(async () => {
    userAvatarHandler();
    showUserAvatarDialog();
    const avatarsRes = await fetch(
      `${import.meta.env.PUBLIC_FULL_URL}/api/dashboard/user-avatars/`
    );
    if (avatarsRes.ok) {
      const userAvatars = await avatarsRes.json();
      preloadedAvatarList = userAvatars.data;
    }
  });

  const handleAvatarFileSelect = (e: any) => {
    const { acceptedFiles } = e.detail;
    avatarFile = acceptedFiles[0];
    readUrl(avatarFile, "PROFILE");
  };

  const userAvatarModeSelectionHandler = (mode: "AVATAR" | "NEW_IMAGE") => {
    if (userAvatarMode !== mode) {
      userAvatarMode = mode;
    }
  };

  const showUserAvatarDialog = async () => {
    avatarModal?.showModal();
    document.body.style.overflow = "hidden";
  };

  const closeUserAvatarDialog = () => {
    selectedAvatarImageId = 0;
    previewImg.src = $user?.photo ? $user?.photo.url + "" : "";
    avatarModal.close();
    document.body.style.overflow = "";
  };

   // Select an avatar
  const selectAvatar = (avatar: string, avatarId: number) => {
    previewImg.src = avatar;
    selectedAvatarImageId = avatarId;
  };

  const userAvatarHandler = () => {
    avatarModal = document.querySelector("#avatarModal") as HTMLDialogElement;
    previewImg = document.getElementById("previewImg") as HTMLImageElement;
    // Listen for Esc key press
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && avatarModal.open) {
        closeUserAvatarDialog();
      }
    });
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
    await getUserProfile();
    updateProfileLoader = false;
  };

  const updateProfileHandler = async () => {
    updateProfileLoader = true;

    if (avatarFile) {
      if ($user?.photo) {
        fetch(
          `${import.meta.env.PUBLIC_FULL_URL}/api/dashboard/delete-user-image/?` +
            new URLSearchParams(`id=${$user?.photo.id}`),
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

</script>

<dialog class="avatar-dialog rounded-xl min-h-[478px]" id="avatarModal">
  <div class="h-full flex flex-col justify-between">
    <div class="p-4 space-y-5">
      <div class="text-lg font-bold !text-blue-700">
        {translations.avatarImage}
      </div>
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
        <span
          >{updateProfileLoader
            ? translations.pleaseWait + "..."
            : translations.submitForm}</span
        >
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
