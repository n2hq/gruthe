import React, { useEffect, useState, useRef } from 'react'
import { FieldError } from 'react-hook-form';
import { MdError, MdArrowDropDown } from 'react-icons/md'
import { controlInformationClass, inputClass, inputClassError, inputControlWrapper, inputHeadingClass } from '~/lib/css'

// Country data with flags, codes, and names
const COUNTRY_DATA = [
    { code: 'AF', dialCode: '+93', name: 'Afghanistan', flag: '🇦🇫' },
    { code: 'AL', dialCode: '+355', name: 'Albania', flag: '🇦🇱' },
    { code: 'DZ', dialCode: '+213', name: 'Algeria', flag: '🇩🇿' },
    { code: 'AD', dialCode: '+376', name: 'Andorra', flag: '🇦🇩' },
    { code: 'AO', dialCode: '+244', name: 'Angola', flag: '🇦🇴' },
    { code: 'AG', dialCode: '+1-268', name: 'Antigua and Barbuda', flag: '🇦🇬' },
    { code: 'AR', dialCode: '+54', name: 'Argentina', flag: '🇦🇷' },
    { code: 'AM', dialCode: '+374', name: 'Armenia', flag: '🇦🇲' },
    { code: 'AU', dialCode: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: 'AT', dialCode: '+43', name: 'Austria', flag: '🇦🇹' },
    { code: 'AZ', dialCode: '+994', name: 'Azerbaijan', flag: '🇦🇿' },

    { code: 'BS', dialCode: '+1-242', name: 'Bahamas', flag: '🇧🇸' },
    { code: 'BH', dialCode: '+973', name: 'Bahrain', flag: '🇧🇭' },
    { code: 'BD', dialCode: '+880', name: 'Bangladesh', flag: '🇧🇩' },
    { code: 'BB', dialCode: '+1-246', name: 'Barbados', flag: '🇧🇧' },
    { code: 'BY', dialCode: '+375', name: 'Belarus', flag: '🇧🇾' },
    { code: 'BE', dialCode: '+32', name: 'Belgium', flag: '🇧🇪' },
    { code: 'BZ', dialCode: '+501', name: 'Belize', flag: '🇧🇿' },
    { code: 'BJ', dialCode: '+229', name: 'Benin', flag: '🇧🇯' },
    { code: 'BT', dialCode: '+975', name: 'Bhutan', flag: '🇧🇹' },
    { code: 'BO', dialCode: '+591', name: 'Bolivia', flag: '🇧🇴' },
    { code: 'BA', dialCode: '+387', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    { code: 'BW', dialCode: '+267', name: 'Botswana', flag: '🇧🇼' },
    { code: 'BR', dialCode: '+55', name: 'Brazil', flag: '🇧🇷' },
    { code: 'BN', dialCode: '+673', name: 'Brunei', flag: '🇧🇳' },
    { code: 'BG', dialCode: '+359', name: 'Bulgaria', flag: '🇧🇬' },
    { code: 'BF', dialCode: '+226', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: 'BI', dialCode: '+257', name: 'Burundi', flag: '🇧🇮' },

    { code: 'KH', dialCode: '+855', name: 'Cambodia', flag: '🇰🇭' },
    { code: 'CM', dialCode: '+237', name: 'Cameroon', flag: '🇨🇲' },
    { code: 'CA', dialCode: '+1', name: 'Canada', flag: '🇨🇦' },
    { code: 'CV', dialCode: '+238', name: 'Cabo Verde', flag: '🇨🇻' },
    { code: 'CF', dialCode: '+236', name: 'Central African Republic', flag: '🇨🇫' },
    { code: 'TD', dialCode: '+235', name: 'Chad', flag: '🇹🇩' },
    { code: 'CL', dialCode: '+56', name: 'Chile', flag: '🇨🇱' },
    { code: 'CN', dialCode: '+86', name: 'China', flag: '🇨🇳' },
    { code: 'CO', dialCode: '+57', name: 'Colombia', flag: '🇨🇴' },
    { code: 'KM', dialCode: '+269', name: 'Comoros', flag: '🇰🇲' },
    { code: 'CG', dialCode: '+242', name: 'Congo', flag: '🇨🇬' },
    { code: 'CR', dialCode: '+506', name: 'Costa Rica', flag: '🇨🇷' },
    { code: 'CI', dialCode: '+225', name: 'Ivory Coast', flag: '🇨🇮' },
    { code: 'HR', dialCode: '+385', name: 'Croatia', flag: '🇭🇷' },
    { code: 'CU', dialCode: '+53', name: 'Cuba', flag: '🇨🇺' },
    { code: 'CY', dialCode: '+357', name: 'Cyprus', flag: '🇨🇾' },
    { code: 'CZ', dialCode: '+420', name: 'Czech Republic', flag: '🇨🇿' },

    { code: 'DK', dialCode: '+45', name: 'Denmark', flag: '🇩🇰' },
    { code: 'DJ', dialCode: '+253', name: 'Djibouti', flag: '🇩🇯' },
    { code: 'DM', dialCode: '+1-767', name: 'Dominica', flag: '🇩🇲' },
    { code: 'DO', dialCode: '+1-809', name: 'Dominican Republic', flag: '🇩🇴' },

    { code: 'EC', dialCode: '+593', name: 'Ecuador', flag: '🇪🇨' },
    { code: 'EG', dialCode: '+20', name: 'Egypt', flag: '🇪🇬' },
    { code: 'SV', dialCode: '+503', name: 'El Salvador', flag: '🇸🇻' },
    { code: 'GQ', dialCode: '+240', name: 'Equatorial Guinea', flag: '🇬🇶' },
    { code: 'ER', dialCode: '+291', name: 'Eritrea', flag: '🇪🇷' },
    { code: 'EE', dialCode: '+372', name: 'Estonia', flag: '🇪🇪' },
    { code: 'SZ', dialCode: '+268', name: 'Eswatini', flag: '🇸🇿' },
    { code: 'ET', dialCode: '+251', name: 'Ethiopia', flag: '🇪🇹' },

    { code: 'FJ', dialCode: '+679', name: 'Fiji', flag: '🇫🇯' },
    { code: 'FI', dialCode: '+358', name: 'Finland', flag: '🇫🇮' },
    { code: 'FR', dialCode: '+33', name: 'France', flag: '🇫🇷' },

    { code: 'GA', dialCode: '+241', name: 'Gabon', flag: '🇬🇦' },
    { code: 'GM', dialCode: '+220', name: 'Gambia', flag: '🇬🇲' },
    { code: 'GE', dialCode: '+995', name: 'Georgia', flag: '🇬🇪' },
    { code: 'DE', dialCode: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: 'GH', dialCode: '+233', name: 'Ghana', flag: '🇬🇭' },
    { code: 'GR', dialCode: '+30', name: 'Greece', flag: '🇬🇷' },
    { code: 'GD', dialCode: '+1-473', name: 'Grenada', flag: '🇬🇩' },
    { code: 'GT', dialCode: '+502', name: 'Guatemala', flag: '🇬🇹' },
    { code: 'GN', dialCode: '+224', name: 'Guinea', flag: '🇬🇳' },
    { code: 'GW', dialCode: '+245', name: 'Guinea-Bissau', flag: '🇬🇼' },
    { code: 'GY', dialCode: '+592', name: 'Guyana', flag: '🇬🇾' },

    { code: 'HT', dialCode: '+509', name: 'Haiti', flag: '🇭🇹' },
    { code: 'HN', dialCode: '+504', name: 'Honduras', flag: '🇭🇳' },
    { code: 'HU', dialCode: '+36', name: 'Hungary', flag: '🇭🇺' },

    { code: 'IS', dialCode: '+354', name: 'Iceland', flag: '🇮🇸' },
    { code: 'IN', dialCode: '+91', name: 'India', flag: '🇮🇳' },
    { code: 'ID', dialCode: '+62', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'IR', dialCode: '+98', name: 'Iran', flag: '🇮🇷' },
    { code: 'IQ', dialCode: '+964', name: 'Iraq', flag: '🇮🇶' },
    { code: 'IE', dialCode: '+353', name: 'Ireland', flag: '🇮🇪' },
    { code: 'IL', dialCode: '+972', name: 'Israel', flag: '🇮🇱' },
    { code: 'IT', dialCode: '+39', name: 'Italy', flag: '🇮🇹' },

    { code: 'JM', dialCode: '+1-876', name: 'Jamaica', flag: '🇯🇲' },
    { code: 'JP', dialCode: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: 'JO', dialCode: '+962', name: 'Jordan', flag: '🇯🇴' },

    { code: 'KZ', dialCode: '+7', name: 'Kazakhstan', flag: '🇰🇿' },
    { code: 'KE', dialCode: '+254', name: 'Kenya', flag: '🇰🇪' },
    { code: 'KI', dialCode: '+686', name: 'Kiribati', flag: '🇰🇮' },
    { code: 'XK', dialCode: '+383', name: 'Kosovo', flag: '🇽🇰' },
    { code: 'KW', dialCode: '+965', name: 'Kuwait', flag: '🇰🇼' },
    { code: 'KG', dialCode: '+996', name: 'Kyrgyzstan', flag: '🇰🇬' },

    { code: 'LA', dialCode: '+856', name: 'Laos', flag: '🇱🇦' },
    { code: 'LV', dialCode: '+371', name: 'Latvia', flag: '🇱🇻' },
    { code: 'LB', dialCode: '+961', name: 'Lebanon', flag: '🇱🇧' },
    { code: 'LS', dialCode: '+266', name: 'Lesotho', flag: '🇱🇸' },
    { code: 'LR', dialCode: '+231', name: 'Liberia', flag: '🇱🇷' },
    { code: 'LY', dialCode: '+218', name: 'Libya', flag: '🇱🇾' },
    { code: 'LI', dialCode: '+423', name: 'Liechtenstein', flag: '🇱🇮' },
    { code: 'LT', dialCode: '+370', name: 'Lithuania', flag: '🇱🇹' },
    { code: 'LU', dialCode: '+352', name: 'Luxembourg', flag: '🇱🇺' },

    { code: 'MG', dialCode: '+261', name: 'Madagascar', flag: '🇲🇬' },
    { code: 'MW', dialCode: '+265', name: 'Malawi', flag: '🇲🇼' },
    { code: 'MY', dialCode: '+60', name: 'Malaysia', flag: '🇲🇾' },
    { code: 'MV', dialCode: '+960', name: 'Maldives', flag: '🇲🇻' },
    { code: 'ML', dialCode: '+223', name: 'Mali', flag: '🇲🇱' },
    { code: 'MT', dialCode: '+356', name: 'Malta', flag: '🇲🇹' },
    { code: 'MH', dialCode: '+692', name: 'Marshall Islands', flag: '🇲🇭' },
    { code: 'MR', dialCode: '+222', name: 'Mauritania', flag: '🇲🇷' },
    { code: 'MU', dialCode: '+230', name: 'Mauritius', flag: '🇲🇺' },
    { code: 'MX', dialCode: '+52', name: 'Mexico', flag: '🇲🇽' },
    { code: 'FM', dialCode: '+691', name: 'Micronesia', flag: '🇫🇲' },
    { code: 'MD', dialCode: '+373', name: 'Moldova', flag: '🇲🇩' },
    { code: 'MC', dialCode: '+377', name: 'Monaco', flag: '🇲🇨' },
    { code: 'MN', dialCode: '+976', name: 'Mongolia', flag: '🇲🇳' },
    { code: 'ME', dialCode: '+382', name: 'Montenegro', flag: '🇲🇪' },
    { code: 'MA', dialCode: '+212', name: 'Morocco', flag: '🇲🇦' },
    { code: 'MZ', dialCode: '+258', name: 'Mozambique', flag: '🇲🇿' },
    { code: 'MM', dialCode: '+95', name: 'Myanmar', flag: '🇲🇲' },

    { code: 'NA', dialCode: '+264', name: 'Namibia', flag: '🇳🇦' },
    { code: 'NR', dialCode: '+674', name: 'Nauru', flag: '🇳🇷' },
    { code: 'NP', dialCode: '+977', name: 'Nepal', flag: '🇳🇵' },
    { code: 'NL', dialCode: '+31', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'NZ', dialCode: '+64', name: 'New Zealand', flag: '🇳🇿' },
    { code: 'NI', dialCode: '+505', name: 'Nicaragua', flag: '🇳🇮' },
    { code: 'NE', dialCode: '+227', name: 'Niger', flag: '🇳🇪' },
    { code: 'NG', dialCode: '+234', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'KP', dialCode: '+850', name: 'North Korea', flag: '🇰🇵' },
    { code: 'MK', dialCode: '+389', name: 'North Macedonia', flag: '🇲🇰' },
    { code: 'NO', dialCode: '+47', name: 'Norway', flag: '🇳🇴' },

    { code: 'OM', dialCode: '+968', name: 'Oman', flag: '🇴🇲' },

    { code: 'PK', dialCode: '+92', name: 'Pakistan', flag: '🇵🇰' },
    { code: 'PW', dialCode: '+680', name: 'Palau', flag: '🇵🇼' },
    { code: 'PS', dialCode: '+970', name: 'Palestine', flag: '🇵🇸' },
    { code: 'PA', dialCode: '+507', name: 'Panama', flag: '🇵🇦' },
    { code: 'PG', dialCode: '+675', name: 'Papua New Guinea', flag: '🇵🇬' },
    { code: 'PY', dialCode: '+595', name: 'Paraguay', flag: '🇵🇾' },
    { code: 'PE', dialCode: '+51', name: 'Peru', flag: '🇵🇪' },
    { code: 'PH', dialCode: '+63', name: 'Philippines', flag: '🇵🇭' },
    { code: 'PL', dialCode: '+48', name: 'Poland', flag: '🇵🇱' },
    { code: 'PT', dialCode: '+351', name: 'Portugal', flag: '🇵🇹' },

    { code: 'QA', dialCode: '+974', name: 'Qatar', flag: '🇶🇦' },

    { code: 'RO', dialCode: '+40', name: 'Romania', flag: '🇷🇴' },
    { code: 'RU', dialCode: '+7', name: 'Russia', flag: '🇷🇺' },
    { code: 'RW', dialCode: '+250', name: 'Rwanda', flag: '🇷🇼' },

    { code: 'SA', dialCode: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'SN', dialCode: '+221', name: 'Senegal', flag: '🇸🇳' },
    { code: 'RS', dialCode: '+381', name: 'Serbia', flag: '🇷🇸' },
    { code: 'SC', dialCode: '+248', name: 'Seychelles', flag: '🇸🇨' },
    { code: 'SL', dialCode: '+232', name: 'Sierra Leone', flag: '🇸🇱' },
    { code: 'SG', dialCode: '+65', name: 'Singapore', flag: '🇸🇬' },
    { code: 'SK', dialCode: '+421', name: 'Slovakia', flag: '🇸🇰' },
    { code: 'SI', dialCode: '+386', name: 'Slovenia', flag: '🇸🇮' },
    { code: 'SB', dialCode: '+677', name: 'Solomon Islands', flag: '🇸🇧' },
    { code: 'SO', dialCode: '+252', name: 'Somalia', flag: '🇸🇴' },
    { code: 'ZA', dialCode: '+27', name: 'South Africa', flag: '🇿🇦' },
    { code: 'KR', dialCode: '+82', name: 'South Korea', flag: '🇰🇷' },
    { code: 'SS', dialCode: '+211', name: 'South Sudan', flag: '🇸🇸' },
    { code: 'ES', dialCode: '+34', name: 'Spain', flag: '🇪🇸' },
    { code: 'LK', dialCode: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
    { code: 'SD', dialCode: '+249', name: 'Sudan', flag: '🇸🇩' },
    { code: 'SR', dialCode: '+597', name: 'Suriname', flag: '🇸🇷' },
    { code: 'SE', dialCode: '+46', name: 'Sweden', flag: '🇸🇪' },
    { code: 'CH', dialCode: '+41', name: 'Switzerland', flag: '🇨🇭' },
    { code: 'SY', dialCode: '+963', name: 'Syria', flag: '🇸🇾' },

    { code: 'TW', dialCode: '+886', name: 'Taiwan', flag: '🇹🇼' },
    { code: 'TJ', dialCode: '+992', name: 'Tajikistan', flag: '🇹🇯' },
    { code: 'TZ', dialCode: '+255', name: 'Tanzania', flag: '🇹🇿' },
    { code: 'TH', dialCode: '+66', name: 'Thailand', flag: '🇹🇭' },
    { code: 'TL', dialCode: '+670', name: 'Timor-Leste', flag: '🇹🇱' },
    { code: 'TG', dialCode: '+228', name: 'Togo', flag: '🇹🇬' },
    { code: 'TO', dialCode: '+676', name: 'Tonga', flag: '🇹🇴' },
    { code: 'TT', dialCode: '+1-868', name: 'Trinidad and Tobago', flag: '🇹🇹' },
    { code: 'TN', dialCode: '+216', name: 'Tunisia', flag: '🇹🇳' },
    { code: 'TR', dialCode: '+90', name: 'Turkey', flag: '🇹🇷' },
    { code: 'TM', dialCode: '+993', name: 'Turkmenistan', flag: '🇹🇲' },
    { code: 'TV', dialCode: '+688', name: 'Tuvalu', flag: '🇹🇻' },

    { code: 'UG', dialCode: '+256', name: 'Uganda', flag: '🇺🇬' },
    { code: 'UA', dialCode: '+380', name: 'Ukraine', flag: '🇺🇦' },
    { code: 'AE', dialCode: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
    { code: 'GB', dialCode: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'US', dialCode: '+1', name: 'United States', flag: '🇺🇸' },
    { code: 'UY', dialCode: '+598', name: 'Uruguay', flag: '🇺🇾' },
    { code: 'UZ', dialCode: '+998', name: 'Uzbekistan', flag: '🇺🇿' },

    { code: 'VA', dialCode: '+379', name: 'Vatican City', flag: '🇻🇦' },
    { code: 'VE', dialCode: '+58', name: 'Venezuela', flag: '🇻🇪' },
    { code: 'VN', dialCode: '+84', name: 'Vietnam', flag: '🇻🇳' },

    { code: 'YE', dialCode: '+967', name: 'Yemen', flag: '🇾🇪' },

    { code: 'ZM', dialCode: '+260', name: 'Zambia', flag: '🇿🇲' },
    { code: 'ZW', dialCode: '+263', name: 'Zimbabwe', flag: '🇿🇼' }
];


// Find country by dial code
const findCountryByDialCode = (phoneNumber: string) => {
    for (const country of COUNTRY_DATA) {
        if (phoneNumber.startsWith(country.dialCode)) {
            return country;
        }
    }
    return COUNTRY_DATA[0]; // Default to US
};

interface PhoneInputProps {
    controlName: string;
    controlType?: string;
    controlPlaceholder?: string;
    controlTitle: string;
    controlInformation?: string;
    register: any;
    changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: any;
    width?: number;
    disabled?: boolean;
    defaultCountry?: string; // e.g., 'US', 'NG', 'GB'
    showCountrySelector?: boolean;
    setValue?: any;
    getValues?: any;
}

function separatePhoneNumber(phoneText: string) {
    // Split by dash
    const parts = phoneText?.split('-');

    // Check if we have exactly one dash
    if (parts?.length === 3) {
        return {
            countryCode: parts[0],
            dialCode: parts[1],  // "+1"
            number: parts[2],    // "17027325111"
            fullNumber: phoneText
        };
    }

    // If no dash, try to extract dial code automatically
    const cleanText = phoneText?.replace(/[^\d+]/g, '');

    // Find common dial codes
    if (cleanText?.startsWith('+1')) {
        return {
            dialCode: '+1',
            number: cleanText.substring(2),
            fullNumber: phoneText
        };
    } else if (cleanText?.startsWith('+')) {
        // For other dial codes, assume 2-4 digits after +
        const match = cleanText.match(/^(\+\d{1,4})(\d+)/);
        if (match) {
            return {
                dialCode: match[1],
                number: match[2],
                fullNumber: phoneText
            };
        }
    }

    // Return default if no separation possible
    return {
        dialCode: '',
        number: cleanText,
        fullNumber: phoneText
    };
}

// Usage
//const result = separatePhoneNumber('+1-17027325111');
//console.log(result.dialCode); // "+1"
//console.log(result.number);   // "17027325111"

const PhoneNoInput = ({
    controlName,
    controlType = 'tel',
    controlPlaceholder = 'Enter phone number',
    controlTitle,
    controlInformation,
    register,
    changeHandler,
    setValue,
    getValues,
    error,
    width,
    disabled = false,
    defaultCountry = 'US',
    showCountrySelector = true
}: PhoneInputProps) => {
    useEffect(() => {
        if (getValues) {
            const phone = getValues(controlName);
            //console.log(phone)
            // Only process if there's a phone number
            if (phone) {
                const result = separatePhoneNumber(phone);
                const countryCode = result.countryCode
                const dialCode = result.dialCode;
                const localNumber = result.number;

                //console.log("Found:", { phone, dialCode, localNumber });

                // Find the country from the dial code
                if (countryCode) {
                    // Find exact match first, then partial match
                    const countryFromCountryCode = COUNTRY_DATA.find(country =>
                        country.code === countryCode
                    ) || COUNTRY_DATA.find(country =>
                        countryCode.startsWith(country.code)
                    );

                    if (countryFromCountryCode) {
                        console.log("Setting country:", countryFromCountryCode.name);
                        setSelectedCountry(countryFromCountryCode);
                    }
                }

                // Set the display value to LOCAL NUMBER only (without dial code)
                if (localNumber) {
                    console.log("Setting display value:", localNumber);

                    const digitsOnly = localNumber.replace(/\D/g, '');

                    // Format the display value (local number only, country code is separate)
                    const formattedLocal = formatPhoneNumber(digitsOnly);
                    setDisplayValue(formattedLocal);



                }
            }
        }
    }, [getValues, controlName]);

    const [wrapperWidth, setWrapperWidth] = useState('');
    const [inputWidth, setInputWidth] = useState(width);
    const [displayValue, setDisplayValue] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(() =>
        COUNTRY_DATA.find(c => c.code === defaultCountry) || COUNTRY_DATA[0]
    );
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [countrySearch, setCountrySearch] = useState('');


    const filteredCountries = COUNTRY_DATA.filter(country => {
        const q = countrySearch.toLowerCase();
        return (
            country.name.toLowerCase().includes(q) ||
            country.code.toLowerCase().includes(q) ||
            country.dialCode.includes(q)
        );
    });

    // Handle width adjustments
    useEffect(() => {
        if (inputWidth && inputWidth > 0) {
            setWrapperWidth(inputWidth === 100 ? 'xl:w-full' : `xl:w-[${inputWidth}%]`);
        }
    }, [inputWidth]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Format phone number based on selected country
    const formatPhoneNumber = (value: string): string => {
        // Remove all non-numeric characters
        let numbers = value.replace(/\D/g, '');

        // Don't format if too short
        if (numbers.length <= 3) return numbers;

        // Country-specific formatting
        switch (selectedCountry.code) {
            case 'US':
            case 'CA':
                if (numbers.length <= 3) return numbers;
                if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
                return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;

            case 'GB':
                if (numbers.length <= 5) return numbers;
                if (numbers.length <= 8) return `${numbers.slice(0, 5)} ${numbers.slice(5)}`;
                return `${numbers.slice(0, 5)} ${numbers.slice(5, 8)} ${numbers.slice(8)}`;

            case 'NG':
                if (numbers.length <= 4) return numbers;
                if (numbers.length <= 7) return `${numbers.slice(0, 4)} ${numbers.slice(4)}`;
                return `${numbers.slice(0, 4)} ${numbers.slice(4, 7)} ${numbers.slice(7, 11)}`;

            case 'IN':
                if (numbers.length <= 5) return numbers;
                return `${numbers.slice(0, 5)} ${numbers.slice(5, 10)}`;

            default:
                // Generic formatting for other countries
                if (numbers.length <= 3) return numbers;
                if (numbers.length <= 8) {
                    return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
                }
                return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6)}`;
        }
    };

    // Handle country selection
    const handleCountrySelect = (country: typeof COUNTRY_DATA[0]) => {
        //console.log(country)
        //console.log(country.dialCode)

        setSelectedCountry(country);
        setShowDropdown(false);

        // If there's already a number, refocus and prepare for editing
        if (displayValue && inputRef.current) {
            inputRef.current.focus();

            const digitsOnly = inputRef.current.value.replace(/\D/g, '');


            // Format the display value (local number only, country code is separate)
            const formattedLocal = formatPhoneNumber(digitsOnly);
            setDisplayValue(formattedLocal);

            // Combine country code + local number for storage
            const fullNumber = country.code + "-" + country.dialCode + "-" + digitsOnly;
            console.log(fullNumber)

            // Create synthetic event for form handler
            setValue(controlName, fullNumber, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true
            });
        }
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;


        // Allow deleting completely
        if (rawValue === '') {
            setDisplayValue('');
            if (changeHandler) {
                changeHandler(e);
            }
            return;
        }

        // Remove any non-digit characters for formatting
        const digitsOnly = rawValue.replace(/\D/g, '');

        // Format the display value (local number only, country code is separate)
        const formattedLocal = formatPhoneNumber(digitsOnly);
        setDisplayValue(formattedLocal);

        // Combine country code + local number for storage
        //const fullNumber = selectedCountry.code + "-" + digitsOnly;
        const fullNumber = selectedCountry.code + "-" + selectedCountry.dialCode + "-" + digitsOnly;
        // Create synthetic event for form handler
        setValue(controlName, fullNumber, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });


    };

    // Handle paste event
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');

        // Check if pasted text includes a country code
        const countryFromPaste = findCountryByDialCode(pastedText);
        if (countryFromPaste.code !== selectedCountry.code) {
            setSelectedCountry(countryFromPaste);
        }

        // Extract local number (remove country code)
        let localNumber = pastedText;
        if (pastedText.startsWith(countryFromPaste.dialCode)) {
            localNumber = pastedText.substring(countryFromPaste.dialCode.length);
        }

        // Clean and format
        const cleanLocal = localNumber.replace(/\D/g, '');
        const formatted = formatPhoneNumber(cleanLocal);

        // Set display value
        setDisplayValue(formatted);

        // Update form with full number
        //const fullNumber = countryFromPaste.code + "-" + cleanLocal;
        const fullNumber = countryFromPaste.code + "-" + countryFromPaste.dialCode + "-" + cleanLocal

        setValue(controlName, fullNumber, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });
    };

    // Get the current full phone number for display in tooltip or debug
    const getFullDisplayNumber = () => {
        const localDigits = displayValue.replace(/\D/g, '');
        return selectedCountry.dialCode + ' ' + displayValue;
    };

    return (
        <div className={inputControlWrapper}>
            <div className={inputHeadingClass}>
                <div className="mb-0 text-xl">
                    {controlTitle}
                </div>
                {controlInformation && controlInformation.length > 1 && (
                    <div className={controlInformationClass}>
                        {controlInformation}
                    </div>
                )}
            </div>

            <div className="w-[100%]">
                <div className="flex items-stretch rounded-full pl-4 pr-2 py-2 border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                    {/* Country Code Selector */}
                    {showCountrySelector && (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                className="flex items-center justify-between px-3 py-2.5 border-r border-gray-300 bg-gray-50 hover:bg-gray-100 min-w-[120px]"
                                onClick={() => setShowDropdown(!showDropdown)}
                                disabled={disabled}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{selectedCountry.flag}</span>
                                    <span className="font-medium">{selectedCountry.dialCode}</span>
                                </div>
                                <MdArrowDropDown className={`text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                                    {/* Search box */}
                                    <div className="p-2 border-b">
                                        <input
                                            type="text"
                                            value={countrySearch}
                                            onChange={(e) => setCountrySearch(e.target.value)}
                                            placeholder="Search country or code"
                                            className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Country list */}
                                    <div className="max-h-52 overflow-y-auto">
                                        {filteredCountries.length > 0 ? (
                                            filteredCountries.map((country) => (
                                                <button
                                                    key={country.code}
                                                    type="button"
                                                    className={`flex items-center w-full px-3 py-2 text-left hover:bg-gray-50 ${selectedCountry.code === country.code ? 'bg-blue-50' : ''
                                                        }`}
                                                    onClick={() => {
                                                        handleCountrySelect(country);
                                                        setCountrySearch('');
                                                    }}
                                                >
                                                    <span className="text-lg mr-2">{country.flag}</span>
                                                    <span className="font-medium mr-3">{country.dialCode}</span>
                                                    <span className="text-gray-600 flex-1">{country.name}</span>
                                                    <span className="text-sm text-gray-400">{country.code}</span>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-3 py-2 text-sm text-gray-500">
                                                No results found
                                            </div>
                                        )}
                                    </div>

                                </div>
                            )}
                        </div>
                    )}

                    {/* Phone Number Input */}
                    <div className="flex relative place-items-center place-content-center grow ">
                        {showCountrySelector && (
                            <div className="absolute left-3 text-gray-500 pointer-events-none h-full  flex place-items-center font-bold">
                                {selectedCountry.dialCode}
                            </div>
                        )}
                        <input
                            {...register(controlName, {
                                onChange: handleInputChange
                            })}
                            ref={inputRef}
                            type={controlType}
                            className={`  focus:ring-0 w-full h-full pl-12 ml-3 ${disabled && 'bg-gray-200/80'} outline-none text-[14px] bg-transparent  `}
                            placeholder={controlPlaceholder}
                            disabled={disabled}
                            value={displayValue}

                            onPaste={handlePaste}
                            inputMode="tel"
                            autoComplete="tel"
                        />
                    </div>
                </div>

                {/* Full number preview (optional) */}
                {displayValue && (
                    <div className="mt-1 text-sm text-gray-500">
                        Full number: {getFullDisplayNumber()}
                    </div>
                )}

                {error && (
                    <div className={inputClassError}>
                        <MdError className="text-lg" />
                        {error.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhoneNoInput;