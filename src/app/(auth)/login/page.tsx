import LoginForm from '@/components/login-form'

const LoginPage = () => {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-start-8 col-span-5 mt-10'>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
