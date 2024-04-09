export const formatNumber = (value: string) => {
  return parseInt(value.replace(/[^\d.]/g, ''));
};

export const formatMoney = (value: string) => {
  let valueChange = value.replace(/[^\d.]/g, ''); // Xóa tất cả ký tự không phải số và dấu chấm

  valueChange = valueChange.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); // Thêm dấu phẩy phân cách phần ngàn
  let parts = valueChange.split('.');
  if (parts.length > 1) {
    parts[1] = parts[1].slice(0, 6); // Giới hạn số chữ số sau dấu thập phân là 6
    valueChange = parts.join('.'); // Gộp lại thành số
  }
  return valueChange;
};
