const tabSpanContent = [
  [
    {
      id: 1,
      data: "Create chats with any business (even if they’re not on Tinvio)",
    },
    { id: 2, data: "Fully integrated with your favorite chat apps" },
    { id: 3, data: "Real-time messages and alerts" },
  ],
  [
    {
      id: 1,
      data: "Create or confirm purchase orders at lightning speed",
    },
    { id: 2, data: "Manage inventory details and availability in real-time" },
    { id: 3, data: "24/7 order insights and data reports" },
  ],
  [
    {
      id: 1,
      data: "Send invoices and easily track them until they’re paid",
    },
    { id: 2, data: "Real-time payments settlement and reconciliation" },
    { id: 3, data: "Safe, secure, and compliant" },
  ],
];

const tabs = [
  { id: 1, btnName: "Chats" },
  { id: 2, btnName: "Orders" },
  { id: 3, btnName: "Payments" },
];

const thirdBlockRedSpans = [
  { classNaming: "buddyHr", spanText: " More buddy" },
  { classNaming: "speedyHr", spanText: " More speedy" },
  { classNaming: "moneyHr", spanText: " More money" },
];

function inputInfoAlteration(phoneInputFoo) {
  const alteredInputInfo = [
    {
      name: "name",
      label: "Name",
      placeholder: "John Appleseed",
      type: "text",
    },
    {
      name: "businessName",
      label: "Business Name",
      placeholder: "Burgers & Boba (Singapore)",
      type: "text",
    },
    {
      name: "phone",
      label: "Phone",
      placeholder: "65 9123 4567",
      type: "tel",
      changehandler: phoneInputFoo,
    },
  ];

  return alteredInputInfo;
}

export { tabSpanContent, tabs, thirdBlockRedSpans, inputInfoAlteration };
