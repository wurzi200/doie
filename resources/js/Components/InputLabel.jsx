import { textSecondary } from "@/constants";

export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`${textSecondary} block font-medium text-sm` + className}>
            {value ? value : children}
        </label>
    );
}
