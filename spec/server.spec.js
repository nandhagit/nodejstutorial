var request = require('request')

describe('calc', ()=>{
    it('multiply 2 and 2',()=>{
        expect(2*2).toBe(4)
    })
})

describe('request', ()=>{
    it('should return status 200 ok', (done)=>{
        request.get('http://localhost:3001/messages', (err, res)=>{
            expect(res.statusCode).toEqual(200)
            done()
        })
    })

    it('should return some length', (done)=>{
        request.get('http://localhost:3001/messages', (err, res)=>{
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })
})

describe('request', ()=>{
    it('should return status 200 ok', (done)=>{
        request.get('http://localhost:3001/messages/sujith', (err, res)=>{
            expect(res.statusCode).toEqual(200)
            done()
        })
    })

    it('should be same name', (done)=>{
        request.get('http://localhost:3001/messages/sujith', (err, res)=>{
            expect(JSON.parse(res.body)[0].name).toEqual('sujith')
            done()
        })
    })
})