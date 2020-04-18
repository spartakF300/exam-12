import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../../components/UI/Form/FormElement";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {fetchSendPhoto} from "../../store/actions/actionsGallery";

class AddPhoto extends Component {
    state = {
        title: '',
        image: null,
    };

    submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });
        this.props.submit(formData);
    };
    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    fileChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.files[0]})
    };
    getFieldError = fieldName => {
        try {
            return this.props.error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };
    render() {
        return (
            <>
                <Grid container justify="center">
                    <Grid item xs={12} md={10} lg={6}>
                        <Box pt={2} pb={2}>
                            <Typography variant="h4">Add photo</Typography>
                        </Box>

                        <form onSubmit={this.submitFormHandler}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs>
                                    <FormElement
                                        propertyName="title"
                                        type="text"
                                        title="Title"
                                        value={this.state.title}
                                        error={this.getFieldError('title')}
                                        onChange={this.inputChangeHandler}
                                        placeholder="Title"

                                    />
                                </Grid>
                                <Grid item xs>
                                    <FormElement
                                        propertyName="image"
                                        title="Image"
                                        type="file"
                                        onChange={this.fileChangeHandler}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Button type="submit" color="primary" variant="contained">
                                        Send
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </>
        );
    }
}
const mapDispatchToProps = dispatch =>({
   submit: (data)=> dispatch(fetchSendPhoto(data))
});
export default connect(null,mapDispatchToProps) (AddPhoto);