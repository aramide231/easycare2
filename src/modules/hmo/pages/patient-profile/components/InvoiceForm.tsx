import { useMemo, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { toast } from "react-toastify";
import { formatLogDateTime } from "@/lib/dateTime";
import {
  formatNairaAmount,
  INVOICE_PAYMENT_OPTIONS,
  nextInvoiceNumber,
  parseNairaInput,
  SEED_INVOICE_ITEMS,
  type InvoicePaymentItem,
} from "../data/mockInvoiceData";

type Props = {
  uniqueId: string;
  surname: string;
  otherNames: string;
  mobileNo: string;
  groupId: string;
  cashierName?: string;
  onConfirm?: () => void;
};

const fieldBoxClass =
  "flex h-[45px] min-w-0 flex-1 items-center overflow-hidden rounded-lg border-[0.5px] border-black bg-[#FAFAFA] px-4 text-[15px] tracking-[-0.3px] text-black";

const labelClass =
  "w-full shrink-0 text-[15px] tracking-[-0.3px] text-black sm:w-[163px]";

const InvoiceForm = ({
  uniqueId,
  surname,
  otherNames,
  mobileNo,
  groupId,
  cashierName = "captures cashier username",
  onConfirm,
}: Props) => {
  const [capturedAt] = useState(() => formatLogDateTime(new Date()));
  const [items, setItems] = useState<InvoicePaymentItem[]>(SEED_INVOICE_ITEMS);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [discountInput, setDiscountInput] = useState("500");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [confirmedCashier, setConfirmedCashier] = useState("");

  const amount = useMemo(
    () => items.reduce((sum, item) => sum + item.amount, 0),
    [items],
  );
  const discount = parseNairaInput(discountInput);
  const totalAmount = Math.max(amount - discount, 0);
  const outstandingBalance = 0;

  const availableOptions = INVOICE_PAYMENT_OPTIONS.filter(
    (option) => !items.some((item) => item.label === option.label),
  );

  const handleSelectOption = (label: string, defaultAmount: number) => {
    setSelectedLabel(label);
    setPriceInput(String(defaultAmount));
    setDropdownOpen(false);
  };

  const handleSaveItem = () => {
    if (!selectedLabel) {
      toast.info("Select a payment description.");
      return;
    }
    const price = parseNairaInput(priceInput);
    if (price <= 0) {
      toast.info("Enter a valid price.");
      return;
    }
    if (items.some((item) => item.label === selectedLabel)) {
      toast.info("That description is already added.");
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        id: `${selectedLabel}-${Date.now()}`,
        label: selectedLabel,
        amount: price,
      },
    ]);
    setSelectedLabel("");
    setPriceInput("");
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleConfirm = () => {
    if (items.length === 0) {
      toast.info("Add at least one payment description.");
      return;
    }
    if (!invoiceNo) {
      setInvoiceNo(nextInvoiceNumber());
    }
    if (!confirmedCashier) {
      setConfirmedCashier(
        cashierName === "captures cashier username" ? "HMO Cashier" : cashierName,
      );
    }
    onConfirm?.();
    toast.success("Invoice confirmed.");
  };

  const mobileDisplay = mobileNo.replace(/^\+?234/, "").trim();

  return (
    <div className="rounded-[10px] border-[0.5px] border-[#A5A5A5] p-5">
      <div className="flex w-full flex-col items-center gap-8">
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <label className={labelClass}>UNIQUE ID</label>
            <div className={fieldBoxClass}>{uniqueId}</div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <label className={labelClass}>SURNAME</label>
            <div className={fieldBoxClass}>{surname}</div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <label className={labelClass}>OTHER NAMES</label>
            <div className={fieldBoxClass}>{otherNames}</div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <label className={labelClass}>MOBILE NO.</label>
            <div className={fieldBoxClass}>
              <span className="text-[#626262]">+234|&nbsp;&nbsp;&nbsp;</span>
              <span>{mobileDisplay || "0123 456 789"}</span>
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <label className={labelClass}>GROUP ID</label>
            <div className={fieldBoxClass}>{groupId}</div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <label className={labelClass}>DATE | TIME</label>
            <div className={`${fieldBoxClass} italic text-[#808080]`}>
              {capturedAt}
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <label className={labelClass}>PAYMENT DESCRIPTION(S)</label>
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <div className="relative min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((open) => !open)}
                    className={`${fieldBoxClass} w-full justify-between italic text-[#808080]`}
                  >
                    <span className="truncate">
                      {selectedLabel || "select payment description(s)"}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-gray-500 transition ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                      {availableOptions.length === 0 ? (
                        <p className="px-4 py-3 text-sm text-gray-500">
                          No more descriptions available
                        </p>
                      ) : (
                        availableOptions.map((option) => (
                          <button
                            key={option.label}
                            type="button"
                            onClick={() =>
                              handleSelectOption(
                                option.label,
                                option.defaultAmount,
                              )
                            }
                            className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-[#EEECFA]"
                          >
                            <span>{option.label}</span>
                            <span className="text-gray-500">
                              {formatNairaAmount(option.defaultAmount, true)}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  placeholder="Price here"
                  className="h-[45px] w-full rounded-lg border-[0.5px] border-black bg-[#FAFAFA] px-4 text-[15px] italic tracking-[-0.3px] text-black placeholder:text-[#808080] focus:border-[#573FD1] focus:outline-none sm:w-[103px]"
                />
                <button
                  type="button"
                  onClick={handleSaveItem}
                  className="flex h-[45px] w-full items-center justify-center rounded-lg bg-[#573FD1] text-[15px] font-semibold tracking-[-0.3px] text-white hover:bg-[#4a35b0] sm:w-[70px]"
                >
                  Save
                </button>
              </div>

              {items.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-8 rounded-lg border border-dashed border-[#573FD1] bg-white p-2.5"
                    >
                      <span className="text-[15px] italic tracking-[-0.3px] text-black">
                        {item.label}
                      </span>
                      <span className="text-[15px] italic tracking-[-0.3px] text-black">
                        {formatNairaAmount(item.amount, true)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-[#FF3B30] hover:text-red-700"
                        aria-label={`Remove ${item.label}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <label className={labelClass}>DESCRIPTION(S)</label>
            <div className="flex min-h-[45px] min-w-0 flex-1 flex-wrap items-center gap-2 overflow-hidden rounded-lg border-[0.5px] border-black bg-[#FAFAFA] p-1.5">
              {items.length === 0 ? (
                <span className="px-3 text-sm italic text-[#808080]">
                  No descriptions yet
                </span>
              ) : (
                items.map((item) => (
                  <span
                    key={`desc-${item.id}`}
                    className="rounded-lg border border-[#E9E9E9] bg-white p-2.5 text-[15px] tracking-[-0.3px] text-black"
                  >
                    {item.label}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <label className={labelClass}>AMOUNT</label>
            <div className={fieldBoxClass}>{formatNairaAmount(amount)}</div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <label className={labelClass}>DISCOUNT</label>
            <div className={`${fieldBoxClass} gap-1`}>
              <span>N</span>
              <input
                type="text"
                value={discountInput}
                onChange={(e) => setDiscountInput(e.target.value.replace(/[^\d.]/g, ""))}
                className="h-full w-full bg-transparent text-[15px] tracking-[-0.3px] text-black focus:outline-none"
                aria-label="Discount"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <label className={labelClass}>TOTAL AMOUNT</label>
            <div className="flex min-w-0 flex-1 flex-col gap-2 lg:flex-row lg:items-center lg:gap-2">
              <div className={fieldBoxClass}>
                {formatNairaAmount(totalAmount)}
              </div>
              <p className="shrink-0 text-[15px] font-semibold tracking-[-0.3px]">
                <span className="text-[#FA7401]">
                  Outstanding Balance: {formatNairaAmount(outstandingBalance)}
                </span>
                <span className="text-black">{"  |  "}</span>
                <span className="text-[#00C851]">
                  {formatNairaAmount(outstandingBalance)}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <label className={labelClass}>INVOICE NO</label>
            <div
              className={`${fieldBoxClass} ${
                invoiceNo ? "" : "italic text-[#808080]"
              }`}
            >
              {invoiceNo || "(auto-generate next invoice number)"}
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <label className={labelClass}>CASHIER NAME</label>
            <div
              className={`${fieldBoxClass} ${
                confirmedCashier ? "" : "italic text-[#808080]"
              }`}
            >
              {confirmedCashier || cashierName}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          className="flex h-[45px] w-full max-w-[640px] items-center justify-center rounded-lg bg-[#573FD1] text-[15px] font-semibold tracking-[-0.3px] text-white hover:bg-[#4a35b0]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;
