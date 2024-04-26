import http from '@/lib/http'

const usersApis = {
  register(body: { email: string; password: string; confirmPassword: string }) {
    return http.post('/users/register', body)
  }
}

export default usersApis
