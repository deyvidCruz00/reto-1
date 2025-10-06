import { useForm } from 'react-hook-form'
import { useClients } from '../context/ClientContext'

function AddClient() {
  const { register, handleSubmit } = useForm();
  const { createClient } = useClients();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    //createClient(data);
  });

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Agregar cliente
        </h1>
        <input
          type="text"
          placeholder='Document'
          {...register("document", { required: true })}
          autoFocus
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <input
          type="text"
          placeholder='First Name'
          {...register("firstname", { required: true })}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <input
          type="text"
          placeholder='Last Name'
          {...register("lastname", { required: true })}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <input
          type="text"
          placeholder='Address'
          {...register("address", { required: true })}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <input
          type="text"
          placeholder='Phone'
          {...register("phone", { required: true })}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <input
          type="email"
          placeholder='Email'
          {...register("email", { required: true })}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition text-white"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default AddClient
