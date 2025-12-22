const formatChatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);
  const today = new Date();

  const isToday = d.toDateString() === today.toDateString();

  return isToday
    ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
};

export default formatChatDate;