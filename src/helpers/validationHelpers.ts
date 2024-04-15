import {
  ForgotPasswordRequest,
  LoginUserRequest,
  RegisterUserRequest,
  ResetPasswordRequest,
} from '@/boundary/interfaces/auth';
import { CreatePetRequest, EditPetRequest } from '@/boundary/interfaces/pet';
import { CreateJournalEntryRequest, UpdateJournalEntryRequest } from '@/boundary/interfaces/journal';
import { CreateMagicProjectRequest } from '@/boundary/interfaces/magicStudio';
import { CreateUserSubscriptionRequest } from '@/boundary/interfaces/admin';
import { CreateSiteContentRequest } from '@/boundary/interfaces/siteContent';
import { CustomerFeedbackRequest } from '@/boundary/interfaces/customer';

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

export function validateFeedbackFormInputErrors(formData: CustomerFeedbackRequest) {
  const errors: CustomerFeedbackRequest = {
    email: '', feedback: '', rating: 0,
  };

  if (formData.email.trim() === '') {
    errors.email = 'Email cannot be empty';
  } else if (!isEmailValid(formData.email.trim())) {
    errors.email = 'Invalid email address';
  }

  if (formData.feedback.trim() === '') {
    errors.feedback = 'Description cannot be empty';
  }

  for (const key in errors) {
    if (key !== "rating" && errors[key as keyof CustomerFeedbackRequest] !== '') {
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

export function validateSubscriptionFormInputErrors(formData: CreateUserSubscriptionRequest) {
  const errors: CreateUserSubscriptionRequest = {
    customerEmail: '', customerId: '',
  };

  if (formData.customerId.trim() === '') {
    errors.customerId = 'Customer Id cannot be empty';
  }

  for (const key in errors) {
    if (key !== 'customerEmail' && errors[key as keyof CreateUserSubscriptionRequest] !== '') {
      return errors;
    }
  }

  return null;
}

export function validateCreateProjectFormInputErrors(formData: CreateMagicProjectRequest) {
  const errors: CreateMagicProjectRequest = {
    pdf_content: '',
    periodFrom: '', periodTo: '', title: '',
  };

  if (formData.title.trim() === '') {
    errors.title = 'Title cannot be empty';
  }

  for (const key in errors) {
    if (key !== 'content' && key !== 'periodTo' && key !== 'periodTo' && errors[key as keyof CreateMagicProjectRequest] !== '') {
      return errors;
    }
  }

  return null;
}

export function validateCreatePetFormInputErrors(formData: CreatePetRequest) {
  const errors: CreatePetRequest = {
    breed: '',
    dateOfBirth: '',
    description: '',
    name: '',
    nickname: '',
    petTraits: null,
    profilePicture: null,
    species: '',
  };

  validateCreateEditPetRequests(formData, errors);

  // Check if there are any errors and return null if all input is valid
  for (const key in errors) {
    if (key !== 'petTraits' && key !== 'profilePicture' && errors[key as keyof CreatePetRequest] !== '') {
      return errors;
    }
  }

  return null;
}

function validateCreateEditPetRequests(formData: EditPetRequest | CreatePetRequest, errors: EditPetRequest | CreatePetRequest) {
  if (formData.name.trim() === '') {
    errors.name = 'Name cannot be empty';
  } else if (formData.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters long';
  }

  if (formData.species.trim() === '') {
    errors.species = 'Species cannot be empty';
  }

  if (formData.description.trim() === '') {
    errors.description = 'Description cannot be empty';
  } else if (formData.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters long';
  }

  if (formData.nickname !== null && formData.nickname?.trim().length < 3) {
    errors.nickname = 'Nick name must be at least 3 characters long';
  }

  if (formData.breed !== null && formData.breed?.trim().length < 3) {
    errors.breed = 'Breed must be at least 3 characters long';
  }
}

export function validateEditPetFormInputErrors(formData: EditPetRequest) {
  const errors: EditPetRequest = {
    petId: 0,
    breed: '',
    dateOfBirth: '',
    description: '',
    name: '',
    nickname: '',
    species: '',
  };

  validateCreateEditPetRequests(formData, errors);

  // Check if there are any errors and return null if all input is valid
  for (const key in errors) {
    if (key !== "petId" && errors[key as keyof EditPetRequest] !== '') {
      return errors;
    }
  }

  return null;
}

export function validateCreateJournalFormInputErrors(formData: CreateJournalEntryRequest) {
  const errors: CreateJournalEntryRequest = {
    attachments: null, content: '', event: '', location: '', mood: '', petIds: [], tags: '', title: '',
  };

  validateTitleAndContent(formData, errors);

  // Check if there are any errors and return null if all input is valid
  for (const key in errors) {
    if (key !== 'petIds' && key !== 'attachments' && errors[key as keyof CreateJournalEntryRequest] !== '') {
      return errors;
    }
  }

  return null;
}

function validateTitleAndContent(formData: CreateSiteContentRequest|CreateJournalEntryRequest|UpdateJournalEntryRequest, errors: CreateSiteContentRequest|CreateJournalEntryRequest|UpdateJournalEntryRequest) {
  if (formData.title.trim() === '') {
    errors.title = 'Title cannot be empty';
  } else if (formData.title.trim().length < 8) {
    errors.title = 'Title must be at least 8 characters long';
  }

  if (formData.content.trim() === '') {
    errors.content = 'description cannot be empty';
  } else if (formData.content.trim().length < 20) {
    errors.content = 'description must be at least 20 characters long';
  }
}

export function validateSiteContentFormInputErrors(formData: CreateSiteContentRequest) {
  const errors: CreateSiteContentRequest = {
    content: '', type: '', title: '',
  };

  if (formData.type.trim() === '') {
    errors.type = 'Type cannot be empty';
  }

  if (formData.title.trim() === '') {
    errors.title = 'Title cannot be empty';
  } else if (formData.title.trim().length < 8) {
    errors.title = 'Title must be at least 8 characters long';
  }

  // Check if there are any errors and return null if all input is valid
  for (const key in errors) {
    if (key !== "content" && errors[key as keyof CreateSiteContentRequest] !== '') {
      return errors;
    }
  }

  return null;
}


export function validateEditJournalFormInputErrors(formData: UpdateJournalEntryRequest) {
  const errors: UpdateJournalEntryRequest = {
    journalId: 0, petIds: [], content: '', event: '', location: '', mood: '', tags: '', title: '',
  };

  validateTitleAndContent(formData, errors);

  // Check if there are any errors and return null if all input is valid
  for (const key in errors) {
    if (key !== 'petIds' && key !== 'journalId' && errors[key as keyof UpdateJournalEntryRequest] !== '') {
      return errors;
    }
  }

  return null;
}

export function areFilesValid(files: FileList | null) {
  const allowedFileTypes = ['image/png', 'image/jpeg'];
  if (files && files.length > 0) {
    const invalidFiles = Array.from(files).filter((file) => !allowedFileTypes.includes(file.type));
    return invalidFiles.length <= 0;
  }
}