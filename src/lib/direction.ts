// utils/direction.ts
export const getDirection = (locale: string) => {
  const isRTL = ["ur"].includes(locale);
  return {
    direction: isRTL ? "rtl" : "ltr",
    isRTL,
  };
};
