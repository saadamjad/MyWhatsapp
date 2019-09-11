import React, { PureComponent } from 'react'
import { View, StyleSheet, VirtualizedList,Text } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './../../actions/userActions';
import SingleContact from './SingleContact';
import _ from 'underscore';
import colors from './../../appConfig/color';

import * as helpers from './../../helpers';

import ContactsHeader from '../../components/contactsHeader';

class ContactList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showSearchbar: false,
            allContacts:props.appContacts || []
        }
    }

    componentDidMount() {
        this.props.actions.contact(true);
    }   

    componentWillReceiveProps(nextProps){
        if(! helpers.isEqual(nextProps.appContacts,this.state.allContacts)){
            this.setState({ allContacts:nextProps.appContacts })
        }
    }

    _renderItem(item,index){
        return(
            <SingleContact contact={item} {...this.props} />
        )
    }

    onContactSearch(text){
        let searchText = text.trim();
        let allContacts = [...this.props.appContacts];

        if(searchText == ''){
            this.setState({ allContacts:this.props.appContacts })
        } else {
            let filteredContacts = allContacts.filter((contact)=> (contact.savedName || contact.userName).toLowerCase().indexOf(searchText) >= 0 );
            this.setState({allContacts:filteredContacts})
        }
    }

    render() {

        return (
            <View style={{ flex: 1 }} >
                <ContactsHeader onContactSearch={(searchText)=> this.onContactSearch(searchText)} appContacts={this.state.allContacts} {...this.props} />
                <VirtualizedList
                    data={this.state.allContacts}
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
                    ListEmptyComponent={()=>{
                        return (
                            <Text style={{color:colors.lightgray,fontSize:20,alignSelf:'center',marginTop:20}}>No Contacts found...</Text>
                        )
                    }}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    
    return {
        userData: state.user.userData,
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