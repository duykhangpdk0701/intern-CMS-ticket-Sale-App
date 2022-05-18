export const formatMoney = (money: number) => {
  return new Intl.NumberFormat("vi-VN").format(money);
};

export const formatComboPrice = (money: string) => {
  const temp = money.split("/");
  const returnMoney = temp[0];
  const returnAmount = temp[1];

  return {
    money: new Intl.NumberFormat("vi-VN").format(parseInt(returnMoney)),
    amount: returnAmount,
  };
};
