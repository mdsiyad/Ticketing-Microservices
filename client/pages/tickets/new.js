import React,{useState} from 'react'
import useRequest from '../../hooks/use-request'
import Router from 'next/router'


export default function New() {
    const [title,setTitle] = useState('')
    const [price,setPrice] = useState('')
    const {doRequest,errors} = useRequest({
        url:'/api/tickets',
        method:'post',
        body:{
            title,
            price
        },
        onSuccess: (ticket) => Router.push('/')
    })

    const onSubmit = (e) => {
        e.preventDefault()

        doRequest()

        
    }

    const onBlur = () => {
        const value = parseFloat(price)
        if(isNaN(value)){
            return
        }
        setPrice(value.toFixed(2))

    }

  return (
    <div className='container'>
        <h2>Create New Ticket</h2>
        <form >
            <div className="form-group">
                <label>Title</label>
                <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input className="form-control" onBlur={onBlur} value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <button className="btn btn-primary mt-2" onClick={onSubmit}>Submit</button>

            {errors}
        </form>
    </div>
  )
}
