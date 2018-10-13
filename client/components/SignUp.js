import React, {Component} from 'react';
import AuthForm from "./AuthForm";
import {hashHistory} from "react-router";

import {graphql} from "react-apollo";
import mutation from "../mutations/signup";
import query from "../queries/currentUser";

class SignUp extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            errors: []
        }
    }
    componentWillUpdate(nextProps){
        console.log('coming in');
        console.log(this.props.data.user, nextProps.data.user);
        if(nextProps.data.user){
            hashHistory.push('/login');
        }
    }
    onSubmit({email, password}){
        this.props.mutate({
            variables: {email,password},
            refetchQueries: [{query}]
        }).catch(res=>{
            const errors = res.graphQLErrors.map(error=> error.message);
            this.setState({errors});
        });
    }
    render(){
        return(
            <div>
                <h3>SignUp</h3>
                <AuthForm onSubmit= {this.onSubmit.bind(this)} errors = {this.state.errors}/>
            </div>
        )
    }
}

export default graphql(query)(
    graphql(mutation)(SignUp)
)
