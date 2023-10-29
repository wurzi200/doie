import { textMain, textSecondary } from "@/constants";

export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`${textMain} block font-medium text-md` + className}>
            {value ? value : children}
        </label>
    );
}
