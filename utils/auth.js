/*Authentication Helper(인증 헬퍼)는 사용자의 신원을 확인하고 권한을 부여하는 인증(Authentication) 과정을 
자동화하거나 간소화해 주는 소프트웨어 도구 또는 기능을 의미*/

// UUID 생성 및 로컬 스토리지 검사 함수
export const getOrCreateUserId = () => {
  if (typeof window === 'undefined') return null;

  const STORAGE_KEY = 'namgu_user_id';
  let userId = localStorage.getItem(STORAGE_KEY);

  if (!userId) {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      userId = crypto.randomUUID();
    } else {
      userId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
    localStorage.setItem(STORAGE_KEY, userId);
  }

  return userId;
};