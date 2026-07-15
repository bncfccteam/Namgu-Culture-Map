export const initializeUserInPage = async (supabase: any) => {
  if (typeof window === "undefined") return null;

  const STORAGE_KEY = "namgu_user_id";
  let userId = localStorage.getItem(STORAGE_KEY);

  if (!userId) {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      userId = crypto.randomUUID();
    } else {
      userId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        },
      );
    }

    if (supabase) {
      try {
        const { error } = await supabase.from("users").insert([{ id: userId }]);

        if (error) throw error;

        localStorage.setItem(STORAGE_KEY, userId);
      } catch (error) {
        console.error(
          "🚨 [Supabase] 사용자 등록 중 오류 발생:",
          error
        );
        return null;
      }
    } else {
      localStorage.setItem(STORAGE_KEY, userId);
    }
  }

  return userId;
};
