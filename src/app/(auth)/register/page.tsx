import RegisterForm from '@/app/(auth)/register/register-form'

const RegisterPage = () => {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-start-8 col-span-5 mt-10'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage
