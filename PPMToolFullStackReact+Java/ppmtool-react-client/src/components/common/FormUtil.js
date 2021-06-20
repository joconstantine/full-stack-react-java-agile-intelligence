export const renderError = ({ error, touched }, backendError) => {
    if (touched && error) {
        return (
            <div className="invalid-feedback">
                <div className="header">{error}</div>
            </div>
        );
    } else if (backendError) {
        return (
            <div className="invalid-feedback">
                <div className="header">{backendError}</div>
            </div>
        );
    }
    return null;
};

export const renderInput = ({ input, placeholder,
    className, inputClassName,
    disabled, meta, label,
    backendError
}) => {
    const hasErrors = (meta.error && meta.touched) || backendError;
    inputClassName = inputClassName + ` ${hasErrors ? 'is-invalid' : ''}`;
    const labelTag = label ? <h6>{label}</h6> : null;
    return (
        <div className={className}>
            {labelTag}
            <input {...input}
                autoComplete="off"
                placeholder={placeholder}
                className={inputClassName}
                disabled={disabled}
            />
            {renderError(meta, backendError)}
        </div>
    );
};

export const renderTextArea = ({
    input, placeholder, className,
    inputClassName, disabled, meta,
    backendError
}) => {
    const hasErrors = (meta.error && meta.touched) || backendError;
    inputClassName = inputClassName + ` ${hasErrors ? 'is-invalid' : ''}`;
    return (
        <div className={className}>
            <textarea {...input}
                autoComplete="off"
                placeholder={placeholder}
                className={inputClassName}
                disabled={disabled}
            ></textarea>
            {renderError(meta, backendError)}
        </div>
    );
};

export const renderSelect = ({
    input, placeholder, className,
    inputClassName, disabled, meta,
    backendError, options, label
}) => {
    const hasErrors = (meta.error && meta.touched) || backendError;
    inputClassName = inputClassName + ` ${hasErrors ? 'is-invalid' : ''}`;
    options = [
        { value: '', label: `Please ${label}` },
        ...options
    ];
    const renderedOptions = options.map(option => {
        return <option key={option.value} value={option.value}>{option.label}</option>;
    });

    return (
        <div className={className}>
            <select {...input}
                autoComplete="off"
                placeholder={placeholder}
                className={inputClassName}
                disabled={disabled}
            >
                {renderedOptions}
            </select>
            {renderError(meta, backendError)}
        </div>
    );
};