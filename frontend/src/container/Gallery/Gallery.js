import React, {Component} from 'react';
import ModalImg from "../../components/Modal/ModalImg";
import {connect} from "react-redux";
import {deletePhoto, getPhoto} from "../../store/actions/actionsGallery";
import {apiURL} from "../../constants";
import {NavLink} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import Container from "@material-ui/core/Container";

class Gallery extends Component {
    state = {
        modal: false,
        src: ''
    };

    componentDidMount() {
        this.props.getPhoto(this.props.match.params.id)
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.getPhoto(this.props.match.params.id)
        }
    }

    toggle = (link) => {
        this.setState({modal: !this.state.modal, src: typeof link === 'string' ? link : ''})
    };

    render() {
        if (!this.props.photo || this.props.loading) {
            return <Spinner/>
        }

        return (
            <div>
                <ModalImg
                    toggle={this.toggle}
                    modal={this.state.modal}
                >
                    {<img style={{width: '100%'}} src={this.state.src} alt="title"/>}
                </ModalImg>
                <Container>
                    <div className="wrap-img">
                        {this.props.photo.map(p => (
                            <div key={p._id} className="wrapper">
                                <img onClick={() => this.toggle(apiURL + '/' + p.image)} className="gallery-img"
                                     src={apiURL + '/' + p.image} alt={p.title}/>
                                <span className="title">{p.title}</span>
                                <NavLink exact to={'/my_photo/' + p.user._id}
                                         className="user">{p.user.displayName}</NavLink>
                                {this.props.user && this.props.user._id === p.user._id &&
                                <span onClick={() => this.props.deletePhoto(p._id)} className="remove">remove</span>}
                            </div>

                        ))}
                    </div>
                </Container>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    photo: state.gallery.photo,
    user: state.users.user,
    error: state.gallery.error,
    loading: state.gallery.loading,
});
const mapDispatchToProps = dispatch => ({
    getPhoto: (id) => dispatch(getPhoto(id)),
    deletePhoto: (id) => dispatch(deletePhoto(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(Gallery);