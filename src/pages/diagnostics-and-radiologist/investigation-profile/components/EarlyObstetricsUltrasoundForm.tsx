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
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
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
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
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
            label="No of Fetuses"
            value={values.noOfFetuses}
            onChange={(value) => onChange("noOfFetuses", value)}
            options={EARLY_OBSTETRICS_FETUS_OPTIONS}
            placeholder="Singleton (1) | Twins (2) | Triplets (3) -- Deceplet (10)"
          />
          <LabeledSelect
            label="Placentation"
            value={values.placentation}
            onChange={(value) => onChange("placentation", value)}
            options={EARLY_OBSTETRICS_PLACENTATION_OPTIONS}
            placeholder="Cephalic | Breech | Transverse"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
            placeholder="Alive | No Cardiac Activity"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <LabeledSelect
            label="Gender"
            value={values.gender}
            onChange={(value) => onChange("gender", value)}
            options={EARLY_OBSTETRICS_GENDER_OPTIONS}
            placeholder="Male | Female"
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

        <div className="min-w-0">
          <label className={labelClass}>Impression</label>
          <input
            type="text"
            value={values.impression}
            onChange={(e) => onChange("impression", e.target.value)}
            placeholder="text here........"
            className={inputClass}
            aria-label="Impression"
          />
        </div>

        <div className="min-w-0">
          <label className={labelClass}>Recommendation(s)</label>
          <input
            type="text"
            value={values.recommendation}
            onChange={(e) => onChange("recommendation", e.target.value)}
            placeholder="ultrasounds recommendations are (optional)"
            className={`${inputClass} italic placeholder:italic`}
            aria-label="Recommendation(s)"
          />
        </div>
      </div>
    </div>
  );
}
