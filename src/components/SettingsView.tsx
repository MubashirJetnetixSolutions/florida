'use client';

import { useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { CloudUpload, Eye, EyeOff } from 'lucide-react';

const TABS = ['Profile', 'Security', 'Notification'] as const;
type Tab = (typeof TABS)[number];

const fieldClass =
  'w-full h-12 px-[17px] rounded-[13px] bg-white border border-[#E9EFEB] text-[14.5px] text-[#262831] font-normal outline-none focus:border-[#5897FF]/60 focus:ring-1 focus:ring-[#5897FF]/30';

const labelClass = 'text-[12.5px] font-normal text-[#8A8F97] leading-normal';

export default function SettingsView() {
  const [tab, setTab] = useState<Tab>('Profile');
  const [clientName, setClientName] = useState('Mohsin Khan');
  const [email, setEmail] = useState('Mohsin Khan');
  const [phone, setPhone] = useState('Mohsin Khan');
  const [address, setAddress] = useState('Mohsin Khan');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState('••••••••••');
  const [newPassword, setNewPassword] = useState('••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const handleAvatarChange = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  return (
    <div className="flex flex-col gap-4 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-[#EDF1FA] p-2 rounded-[10px]">
        <div className="flex gap-2.5 items-center overflow-x-auto flex-1 min-w-0">
          {TABS.map((item) => {
            const active = tab === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`h-11 min-w-[120px] px-5 rounded-[8px] text-[14.5px] font-normal text-[#3D404A] transition-all cursor-pointer shrink-0 ${
                  active
                    ? 'bg-white border border-[#E8EAEE] shadow-[0px_4px_12px_rgba(0,0,0,0.08)]'
                    : 'bg-[rgba(251,253,252,0.5)] border border-transparent hover:border-[#E8EEEA]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="h-11 px-8 rounded-[10px] text-white text-[14.5px] font-medium shrink-0 cursor-pointer transition-all hover:shadow-lg active:scale-[0.98] sm:ml-auto"
          style={{
            backgroundImage:
              'linear-gradient(101deg, rgb(88, 151, 255) 1.1%, rgb(60, 127, 236) 47.8%, rgb(72, 142, 255) 95.2%)',
          }}
        >
          Save
        </button>
      </div>

      <div className="bg-white border border-[#ECEFF3] rounded-[18px] shadow-[0px_1px_50px_rgba(16,24,40,0.06)] p-6 md:p-8">
        {tab === 'Profile' ? (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <div className="relative size-[112px] shrink-0 rounded-[14px] overflow-hidden bg-[#F2F5F8] border border-[#E8EAEE]">
                <Image
                  src={avatarPreview || '/user.png'}
                  alt="Profile"
                  fill
                  className="object-cover"
                  unoptimized={Boolean(avatarPreview)}
                />
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleAvatarChange(e.dataTransfer.files?.[0]);
                }}
                className="flex-1 min-h-[112px] rounded-[14px] border border-dashed border-[#CFD6DE] bg-[#FBFCFD] flex flex-col items-center justify-center gap-1.5 px-4 cursor-pointer hover:border-[#5897FF]/50 hover:bg-[#F7F9FF] transition-colors"
              >
                <CloudUpload size={22} className="text-[#98A1AE]" strokeWidth={1.75} />
                <p className="text-[13.5px] font-medium text-[#3D404A]">
                  Click to upload or drag and drop
                </p>
                <p className="text-[12px] text-[#98A1AE]">SVG, PNG, JPG.</p>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".svg,.png,.jpg,.jpeg,image/svg+xml,image/png,image/jpeg"
                className="hidden"
                onChange={(e) => handleAvatarChange(e.target.files?.[0])}
              />
            </div>

            <Field label="Client Name">
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className={fieldClass}
              />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Email">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                />
              </Field>
              <Field label="Phone">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={fieldClass}
                />
              </Field>
            </div>

            <Field label="Address">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={fieldClass}
              />
            </Field>
          </div>
        ) : null}

        {tab === 'Security' ? (
          <div className="flex flex-col gap-5 max-w-xl">
            <PasswordField
              label="Password"
              value={password}
              onChange={setPassword}
              visible={showPassword}
              onToggle={() => setShowPassword((v) => !v)}
            />
            <div className="flex flex-col gap-1.5">
              <PasswordField
                label="New Password"
                value={newPassword}
                onChange={setNewPassword}
                visible={showNewPassword}
                onToggle={() => setShowNewPassword((v) => !v)}
              />
              <p className="text-[12px] text-[#98A1AE] pl-0.5">
                Your new password must be more than 8 characters.
              </p>
            </div>
            <PasswordField
              label="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              visible={showConfirmPassword}
              onToggle={() => setShowConfirmPassword((v) => !v)}
            />
          </div>
        ) : null}

        {tab === 'Notification' ? (
          <div className="flex flex-col gap-4 max-w-xl">
            <ToggleRow
              title="Email notifications"
              description="Receive updates and alerts by email."
              checked={emailNotifs}
              onChange={setEmailNotifs}
            />
            <ToggleRow
              title="Push notifications"
              description="Show alerts in the app notification panel."
              checked={pushNotifs}
              onChange={setPushNotifs}
            />
            <ToggleRow
              title="Order updates"
              description="Get notified when work orders change status."
              checked={orderUpdates}
              onChange={setOrderUpdates}
            />
            <ToggleRow
              title="Marketing emails"
              description="Occasional product news and tips."
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  visible,
  onToggle,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={labelClass}>{label}</span>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldClass} pr-11`}
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A1AE] hover:text-[#5B6878] cursor-pointer"
        >
          {visible ? <EyeOff size={18} strokeWidth={1.75} /> : <Eye size={18} strokeWidth={1.75} />}
        </button>
      </div>
    </label>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-[#EEF1F4] last:border-b-0">
      <div className="min-w-0">
        <p className="text-[14.5px] font-medium text-[#0B1B34]">{title}</p>
        <p className="mt-0.5 text-[13px] text-[#5B6878]">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors cursor-pointer ${
          checked ? 'bg-[#5897FF]' : 'bg-[#CFD6DE]'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
