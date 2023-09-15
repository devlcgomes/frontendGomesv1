// pages/contato.tsx
"use client";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  nome: string;
  email: string;
  mensagem: string;
  arquivo: FileList;
}

const Contato = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Dados do formulário:", data);
    // Após enviar o formulário, limpe os campos
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && validatePDF(fileList)) {
      // Clear the error message and enable the submit button if a valid PDF is uploaded
      setValue("arquivo", fileList); // Atualize o valor do campo 'arquivo'
      e.target.setCustomValidity("");
    } else {
      e.target.setCustomValidity("Por favor, envie um arquivo PDF");
    }
  };

  const validatePDF = (fileList: FileList | null): boolean => {
    if (!fileList) return false;
    const file = fileList[0];
    const allowedExtensions = ["pdf"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    return allowedExtensions.includes(fileExtension!);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-t from-gradient-primary to-gradient-secondary">
      <div className="shadow-lg p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Entre em contato conosco</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="mb-4">
            <label htmlFor="nome" className="block mb-1">
              Nome:
            </label>
            <input
              {...register("nome", { required: true })}
              className="p-2 rounded-md bg-slate-100 w-full text-gray-300 text-sm"
            />
            {errors.nome && (
              <span className="text-red-500">Este campo é obrigatório</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="p-2 rounded-md bg-slate-100 w-full text-gray-300 text-sm"
            />
            {errors.email && (
              <span className="text-red-500">Este campo é obrigatório</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="mensagem" className="block mb-1">
              Mensagem:
            </label>
            <textarea
              {...register("mensagem", { required: true })}
              className="p-2 rounded-md bg-slate-100 w-full text-gray-300 text-sm"
            />
            {errors.mensagem && (
              <span className="text-red-500">Este campo é obrigatório</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="arquivo" className="block mb-1">
              Envie um arquivo PDF:
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                register("arquivo", { required: true });
                handleFileChange(e);
              }}
            />
            {errors.arquivo && (
              <span className="text-red-500">{errors.arquivo.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            disabled={isSubmitting}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contato;
