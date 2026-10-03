import {
  EARLY_OBSTETRICS_EGA_OPTIONS,
  EARLY_OBSTETRICS_FETUS_OPTIONS,
  EARLY_OBSTETRICS_GENDER_OPTIONS,
  EARLY_OBSTETRICS_PLACENTATION_OPTIONS,
  EARLY_OBSTETRICS_ULTRASOUND_TITLE,
  type EarlyObstetricsUltrasoundReport,
} from "../data/ultrasoundScan";

const labelClass = "mb-1.5 block text-sm font-medium text-[#4A6FA5]";

const inputClass =
  "h-11 w-full rounded-lg border border-[#A8C4E8] bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20";

const selectClass = `${inputClass} appearance-none`;

const mmInputClass =
  "h-11 w-full rounded-lg border border-[#A8C4E8] bg-white px-3 pr-10 text-sm text-gray-900 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20";

const textareaClass =
  "min-h-[11rem] w-full resize-y rounded-xl border border-[#A8C4E8] bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20";

type Props = {
  values: EarlyObstetricsUltrasoundReport;
  onChange: (field: keyof EarlyObstetricsUltrasoundReport, value: string) => void;
};

function LabeledInput({
  label,
  value,
  onChange,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
        aria-label={label}
      />
    </div>
  );
}

function MmInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={mmInputClass}
          aria-label={label}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">
          mm
        </span>
      </div>
    </div>
  );
}

function LabeledSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${selectClass} ${value ? "text-gray-900" : "text-gray-400"}`}
        aria-label={label}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function ExpandableTextarea({
  label,
  value,
  onChange,
  placeholder,
  italicPlaceholder = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  italicPlaceholder?: boolean;
}) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={6}
        className={`${textareaClass} ${
          italicPlaceholder ? "italic placeholder:italic" : ""
        }`}
        aria-label={label}
      />
    </div>
  );
}

export default function EarlyObstetricsUltrasoundForm({
  values,
  onChange,
}: Props) {
  return (
    <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="bg-[#573FD1] px-4 py-3 text-center">
        <h2 className="text-sm font-bold uppercase tracking-wide text-white sm:text-base">
          {EARLY_OBSTETRICS_ULTRASOUND_TITLE}
        </h2>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <LabeledSelect
            label="No of Foetus"
            value={values.noOfFetuses}
            onChange={(value) => onChange("noOfFetuses", value)}
            options={EARLY_OBSTETRICS_FETUS_OPTIONS}
          />
          <LabeledSelect
            label="Placentation"
            value={values.placentation}
            onChange={(value) => onChange("placentation", value)}
            options={EARLY_OBSTETRICS_PLACENTATION_OPTIONS}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <LabeledInput
            label="Cardiac Activity"
            value={values.cardiacActivity}
            onChange={(value) => onChange("cardiacActivity", value)}
          />
          <LabeledInput
            label="Fetal Body Movement (FBM)"
            value={values.fetalBodyMovement}
            onChange={(value) => onChange("fetalBodyMovement", value)}
          />
          <LabeledInput
            label="Fetal Lie (FL)"
            value={values.fetalLie}
            onChange={(value) => onChange("fetalLie", value)}
          />
          <MmInput
            label="Biparimeter Diameter (BPD)"
            value={values.bpd}
            onChange={(value) => onChange("bpd", value)}
          />
          <MmInput
            label="Head Circumference (HC)"
            value={values.headCircumference}
            onChange={(value) => onChange("headCircumference", value)}
          />
          <LabeledInput
            label="Fetal Heart Rate (FHR)"
            value={values.fetalHeartRate}
            onChange={(value) => onChange("fetalHeartRate", value)}
          />
          <MmInput
            label="Femur Length (FL)"
            value={values.femurLength}
            onChange={(value) => onChange("femurLength", value)}
          />
          <LabeledInput
            label="Estimated Fetal Weight (EFW)"
            value={values.estimatedFetalWeight}
            onChange={(value) => onChange("estimatedFetalWeight", value)}
            placeholder="enter date"
          />
          <MmInput
            label="Abdominal Circumference (AC)"
            value={values.abdominalCircumference}
            onChange={(value) => onChange("abdominalCircumference", value)}
          />
          <MmInput
            label="Amniotic Fluid Index"
            value={values.amnioticFluidIndex}
            onChange={(value) => onChange("amnioticFluidIndex", value)}
          />
          <MmInput
            label="Estimated Delivery Date (EDD)"
            value={values.estimatedDeliveryDate}
            onChange={(value) => onChange("estimatedDeliveryDate", value)}
          />
          <LabeledSelect
            label="Mean/Estimated Gestational Age (EGA)"
            value={values.estimatedGestationalAge}
            onChange={(value) => onChange("estimatedGestationalAge", value)}
            options={EARLY_OBSTETRICS_EGA_OPTIONS}
          />
          <LabeledSelect
            label="Gender"
            value={values.gender}
            onChange={(value) => onChange("gender", value)}
            options={EARLY_OBSTETRICS_GENDER_OPTIONS}
          />
          <MmInput
            label="Liquor Volume"
            value={values.liquorVolume}
            onChange={(value) => onChange("liquorVolume", value)}
          />
          <LabeledInput
            label="Cervix"
            value={values.cervix}
            onChange={(value) => onChange("cervix", value)}
          />
        </div>

        <ExpandableTextarea
          label="Impression"
          value={values.impression}
          onChange={(value) => onChange("impression", value)}
          placeholder="text here........"
        />

        <ExpandableTextarea
          label="Recommendation(s)"
          value={values.recommendation}
          onChange={(value) => onChange("recommendation", value)}
          placeholder="ultrasounds recommendations are (optional)"
          italicPlaceholder
        />
      </div>
    </div>
  );
}
