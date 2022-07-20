class AuthController {
    async registration(req, res) {
        try {
            
        } catch (e) {
            console.log(e)
        }
    }
    async login(req, res) {
        try {
            
        } catch (e) {
            console.log(e)
        }
    }
    async getUsers(req, res) {
        try {
            res.json('server is work')
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new AuthController()