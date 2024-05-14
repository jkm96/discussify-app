import {
    ForgotPasswordRequest,
    LoginUserRequest,
    RegisterUserRequest,
    ResetPasswordRequest,
} from '@/boundary/interfaces/auth';
import {CreatePostRequest} from "@/boundary/interfaces/post";

export function isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

export function validateRegisterFormInputErrors(formData: RegisterUserRequest) {
    const errors: RegisterUserRequest = {
        email: '', username: '', password: '', confirmPassword: '',
    };

    if (formData.email.trim() === '') {
        errors.email = 'Email cannot be empty';
    } else if (!isEmailValid(formData.email.trim())) {
        errors.email = 'Invalid email address';
    }

    if (formData.username.trim() === '') {
        errors.username = 'Username cannot be empty';
    } else if (formData.username.trim().length < 4) {
        errors.username = 'Username must be at least 4 characters long';
    }

    validatePasswordCreation(formData, errors);

    // Check if there are any errors and return null if all input is valid
    for (const key in errors) {
        if (errors[key as keyof RegisterUserRequest] !== '') {
            return errors;
        }
    }

    return null;
}

export function validateLoginFormInputErrors(formData: LoginUserRequest) {
    const errors: LoginUserRequest = {
        username: '', password: '',
    };

    if (formData.username.trim() === '') {
        errors.username = 'Username cannot be empty';
    }

    if (formData.password.trim() === '') {
        errors.password = 'Password cannot be empty';
    }

    for (const key in errors) {
        if (errors[key as keyof LoginUserRequest] !== '') {
            return errors;
        }
    }

    return null;
}

export function validateForgotPassFormInputErrors(formData: ForgotPasswordRequest) {
    const errors: ForgotPasswordRequest = {
        email: ''
    };

    if (formData.email.trim() === '') {
        errors.email = 'Email cannot be empty';
    } else if (!isEmailValid(formData.email.trim())) {
        errors.email = 'Invalid email address';
    }

    for (const key in errors) {
        if (errors[key as keyof ForgotPasswordRequest] !== '') {
            return errors;
        }
    }

    return null;
}

function validatePasswordCreation(formData: ResetPasswordRequest | RegisterUserRequest, errors: ResetPasswordRequest | RegisterUserRequest) {
    if (formData.password.trim() === '') {
        errors.password = 'Password cannot be empty';
    } else if (formData.password.trim().length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    if (formData.confirmPassword.trim() === '') {
        errors.confirmPassword = 'Confirm password cannot be empty';
    } else if (formData.confirmPassword.trim().length < 6) {
        errors.confirmPassword = 'Confirm password must be at least 6 characters long';
    } else if (formData.confirmPassword.trim() !== formData.password.trim()) {
        errors.confirmPassword = 'Passwords do not match';
    }
}

export function validateResetPassFormInputErrors(formData: ResetPasswordRequest) {
    const errors: ResetPasswordRequest = {
        confirmPassword: '', password: '', token: '',
        email: ''
    };

    if (formData.email.trim() === '') {
        errors.email = 'Email cannot be empty';
    } else if (!isEmailValid(formData.email.trim())) {
        errors.email = 'Invalid email address';
    }

    validatePasswordCreation(formData, errors);

    for (const key in errors) {
        if (key !== 'token' && errors[key as keyof ResetPasswordRequest] !== '') {
            return errors;
        }
    }

    return null;
}

export function validateCreatePostFormInputErrors(formData: CreatePostRequest) {
    const errors: CreatePostRequest = {
        forumSlug: '', description: '', tags: '', title: ''
    };

    if (formData.title.trim() === '') {
        errors.title = 'Title cannot be empty';
    } else if (formData.title.trim().length < 4) {
        errors.title = 'Title must be at least 4 characters long';
    }

    if (formData.forumSlug.trim() === '') {
        errors.forumSlug = 'Forum is required';
    }

    if (formData.description.trim() === '') {
        errors.description = 'Thread message is required';
    }

    // Check if there are any errors and return null if all input is valid
    for (const key in errors) {
        if (errors[key as keyof CreatePostRequest] !== '') {
            return errors;
        }
    }

    return null;
}