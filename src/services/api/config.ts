export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api";

export const MEMBER_API_CONFIG = {
  ENDPOINTS: {
    members: "members",
  },
};

export const INVESTMENT_API_CONFIG = {
  ENDPOINTS: {
    investments: "investments",
  },
};

export const PAYMENT_API_CONFIG = {
  ENDPOINTS: {
    payments: "payments",
  },
};

export const BANK_PROFIT_API_CONFIG = {
  ENDPOINTS: {
    profits: "bank-profit",
  },
};

export const YEARLY_PAYMENT_API_CONFIG = {
  ENDPOINTS: {
    payment: "yearly-payment",
  },
};

export const EXPENSE_API_CONFIG = {
  ENDPOINTS: {
    expenses: "expenses",
  },
};

export const SUMMARY_API_CONFIG = {
  ENDPOINTS: {
    summary: "summary",
  },
};

export const SIGNIN_API_CONFIG = {
  ENDPOINTS: {
    signin: "signin",
  },
};
