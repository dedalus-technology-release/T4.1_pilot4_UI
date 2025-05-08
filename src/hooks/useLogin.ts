import { useMutation } from "@tanstack/react-query";
import { login } from "../api/user";
import { IFormInput } from "../api/models";

export const useLogin = (options={}) => {
  const mutation = useMutation({
    mutationFn: (formData: IFormInput)=>login(formData),
   ...options
  })
return mutation
};


