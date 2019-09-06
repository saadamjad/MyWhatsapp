import React, { PureComponent } from 'react'
import { View, StyleSheet, VirtualizedList } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './../../actions/userActions';
import SingleContact from './SingleContact';

import ContactsHeader from '../../components/contactsHeader';

class ContactList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showSearchbar: false
        }
    }

    componentDidMount() {
        this.props.actions.contact(true);
    }

    _renderItem(item,index){
        return(
            <SingleContact contact={item} />
        )
    }

    render() {

        return (

            <View style={{ flex: 1 }} >
                <ContactsHeader appContacts={this.props.appContacts} {...this.props} />
                <VirtualizedList
                    data={this.props.appContacts}
                    inverted={true}
                    renderItem={({ item, index }) => this._renderItem(item, index)}
                    ref={reff => { this.VirtualizedList = reff; }}
                    windowSize={30}
                    keyExtractor={(item, index) => item.key}
                    getItem={(data, index) => data[index]}
                    style={{ paddingHorizontal: 10 }}
                    getItemCount={data => data.length}
                    onEndReachedThreshold={0.5}
                    progressViewOffset={300} //android support
                    maxToRenderPerBatch={20}
                    initialNumToRender={20}
                    getItemLayout={(data, index) => (
                        { length: 100, offset: 100 * index, index }
                    )}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.user.appContacts)
    return {
        userData: state.user.userData,
        userContacts: state.user.allContacts,
        appContacts: state.user.appContacts,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

const styles = StyleSheet.create({
    tabView: {
        flex: 1
    },
    card: {
        backgroundColor: '#fff',
        margin: 5,
        padding: 15,
    },
})