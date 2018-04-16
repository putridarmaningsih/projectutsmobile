import React from 'react';
import { 
  Alert, 
  Button, 
  Text, 
  View, 
  Image, 
  StyleSheet, 
  TextInput, 
  ActivityIndicator, 
  FlatList,
  RefreshControl, } from 'react-native';

import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.header}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} >
       MY DIARY </Text>
      </View>
      </View>
    );
  }
}

class LogoTitle2 extends React.Component {
  render() {
    return (
      <View style={styles.header}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} >
       NEW DIARY </Text>
      </View>
      </View>
    );
  }
}
class LogoTitle3 extends React.Component {
  render() {
    return (
      <View style={styles.header}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} >
       MY DIARY </Text>
      </View>
      </View>
    );
  }
}
class LogoEdit extends React.Component {
  render() {
    return (
    <View style={styles.header}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color:'white' }}> EDIT DIARY </Text>
      </View>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
    static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerLeft: null
  };
   constructor(props) {
      super(props);
      this.state = {
        
      };
    }
  render() {
    return (
      <View style={styles.containerMain}>
     <View style={styles.box1}>
      <View style={{alignItems: 'center', justifyContent: 'center' }}>
       <View ><Image source={require('./src/img/cover.png')} style={styles.image1} /></View>
        <View style={styles.box2}>
        <Button
          title="new diary"
           color="#E91E63"
          onPress={() => this.props.navigation.navigate('Details')}
        />
         <Button
          title="my diary's"
           color="#E91E63"
          onPress={() => this.props.navigation.navigate('View')}
        />
        </View>
      </View>
       </View>
      <View style={styles.footer}>
        <Text style= {{ color: 'white' }}> copyright@putriii_d</Text>
        </View>
          </View>
    );
  }
}
class DetailsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle2 />,
    headerLeft: null
  };
   constructor(props) {
      super(props);
      this.state = {
        date: '',
        title: '',
        my_diary: '',

      };
    }
InsertDataIntoMySQL = () =>
    {
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('http://putridarma.000webhostapp.com/putridarma049/kirimData.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  date : this.state.date,

                  title : this.state.title,

                 my_diary : this.state.my_diary

                })
 
            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                alert(responseJsonFromServer);

                this.setState({ ActivityIndicator_Loading : false });

            }).catch((error) =>
            {
                //console.error(error);

              Alert.alert(
              'Error',
              'Failed to input data!',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
                { cancelable: false }
              )

                this.setState({ ActivityIndicator_Loading : false});
            });
        });
    }

  render() {
    return (
    <View style={styles.containerMain}>
     <View style={styles.box4}>  
      <View style={{alignItems: 'center', justifyContent: 'center' }}>
        <View ><Image source={require('./src/img/note1.png')} style={styles.image2} /></View>
        <View style={{ margin: 2 }} >
        <Text style={styles.text}>Date :</Text>
          <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="enter today's date"
          onChangeText={(date) => this.setState({ date })}
          keyboardType='numeric'
          />
          </View>
          <View style={{ margin: 2 }} >
        <Text style={styles.text}>Title Diary :</Text>
          <TextInput style={styles.input}
          placeholder="enter your title diary"
          onChangeText={(title) => this.setState({ title })}
          keyboardType='ascii-capable'
          />
          </View>
        <View style={{ margin: 2 }} >
        <Text style={styles.text}>My Diary :</Text>
          <TextInput style={styles.input2}
          placeholder="enter your diary"
          onChangeText={(my_diary) => this.setState({ my_diary })}
          keyboardType='ascii-capable'
          />
          </View>
         <View style={{ margin: 4 }} >
         <Button
                onPress={() => this.InsertDataIntoMySQL(View)}
                  title="Save Diary"
                  color="#E91E63"
                />
          </View>
          <View style={{ margin: 4 }} >
          <Button
            title="HOME"
           color="#E91E63"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          </View>
      </View>
      </View>
      <View style={styles.footer}>
      <Text style= {{ color: 'white' }}> copyright@putriii_d</Text>
      </View>
      {
        this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#009688' size='large'style={styles.ActivityIndicatorStyle} /> : null
       }
      </View>
    );
  }
}
class ViewScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle3 />,
    headerLeft: null
  };
   constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      ActivityIndicator_Loading: false, 
    };
}
componentDidMount()  {
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
        this.setState({refreshing: true});
        const url = 'http://putridarma.000webhostapp.com/putridarma049/getData.php';
       //this.setState({ loading: true });
        fetch (url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("comp");
          console.log(responseJson);
          this.setState({
            data: responseJson,
            error: responseJson.error || null,
            loading: false,
            refreshing: false,
            ActivityIndicator_Loading: false, 
          });
        }
      );
    });
  }
  _keyExtractor = (item, index) => item.date;
  render() {
    return (
      <View style = {{flex:1,backgroundColor:'#FF80AB', alignItems : 'center', padding: 20}}>
       <Image source={require('./src/img/list.png')}  style={styles.image2} />
       <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>The List Of My Diary</Text>          
           {
          this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'style={styles.ActivityIndicatorStyle} /> : null        
          }
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>
          <View style={styles.box8}>
              <Text>Date : {item.date}</Text>
              <Text>Title : {item.title}</Text>
              <Text>My Diary :  {item.my_diary}</Text>
              <View>
           <View style={{backgroundColor:'white'}}>
            </View>
            </View> 
            </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.componentDidMount.bind(this)}
          />
        }
        /> 
        <View>
         <View style={{backgroundColor:'#FF80AB'}}>
          <View style={{margin:10, flexDirection : 'row'}} >
             <Button
               onPress={() => this.props.navigation.navigate('Edit')}
                  title="Delete"
                  color="#E91E63"
                />
                <Button
                    title="Home"
                    color="#E91E63"
                    onPress={() => this.props.navigation.navigate('Home')}
            />
          </View>
          </View>
      </View> 
      <View style={styles.footer}>
        <Text style= {{ color: 'white' }}> copyright@putriii_d</Text>
        </View>
    </View>
    );
  }
}
 
class EditScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoEdit/>,  
  };
  constructor(props) {
    super(props);
    this.state = {
     date: '',
      title: '',
      my_diary: '',
      ActivityIndicator_Loading: false, 
  };
}
   DeleteRecord = () =>{
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
          fetch('http://putridarma.000webhostapp.com/putridarma049/deleteData.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
        
            date : this.state.date
        
          })
        
          }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({ ActivityIndicator_Loading : false });
            // Menampilkan pesan yang ada di query
            Alert.alert(responseJson);
            this.props.navigation.navigate('View');
        
          }).catch((error) => {
             console.error(error);
             this.setState({ ActivityIndicator_Loading : false });
          });

          
          });
      }
    render() {
    return (
    <View style = {{flex:1,backgroundColor:'#FF80AB', alignItems : 'center', padding: 10}}>
    <Image source={require('./src/img/list.png')}  style={styles.image2} />
    <View style={{
                backgroundColor:'#FF80AB', 
                alignItems: 'center', 
                padding : 20,
                marginTop :10,
                marginLeft: 20, 
                marginRight: 20, 
                height: 250 }}>  
    <View style={{margin:7, height: 40}}>
        <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>Delete Your Diary</Text>
        </View>     
        <TextInput
            style={{
              height: 35,
              width: 300,
              textAlign: 'center',
              backgroundColor: 'white',
              margin: 7 }}
              placeholder="find date to remove your diary"
              value={this.state.date}
              onChangeText={(date) => this.setState({ date })}
              keyboardType='numeric'   
          />
      </View>
       <View>
         <View style={{backgroundColor:'#FF80AB'}}>
          <View style={{margin:20, flexDirection : 'row'}} >
                <Button
                onPress={() => this.DeleteRecord()}
                  title="Delete"
                  color="#E91E63"
                />
                <Button
                    title="Home"
                    color="#E91E63"
                    onPress={() => this.props.navigation.navigate('Home')}
            />
          </View>
          </View>
      </View> 
      </View>
    );
  }
}
const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Edit: {
      screen: EditScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    View: {
      screen: ViewScreen,
    },
    
  },
  {
    initialRouteName: 'Home',
  }
);
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#F8BBD0',
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    flex: 1,
    backgroundColor: '#E91E63'
  },
  box1: {
    flex: 3.5,
    marginTop: 25,
    marginLeft: 15,
    marginRight: 20,
    marginBottom: 25,
    backgroundColor: '#FF80AB',
    justifyContent: 'space-around',
  //flexDirection: 'column',
    alignItems: 'center'
  },
  box2: {
    flex: 0.555,
    marginTop: 1,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#FF80AB',
    justifyContent: 'space-around',
  //flexDirection: 'column',
    alignItems: 'center'
  },
  box3: {
    flex: 0.0,
    color: '#E91E63'
  },
  box4: {
    flex: 6,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#FF80AB',
    justifyContent: 'space-around',
  //flexDirection: 'column',
    alignItems: 'center'
  },
   box5: {
    flex: 3.5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#FF80AB',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center'
  },
  box6: {
    flex: 6,
    marginTop: 5,
    marginLeft: 16,
    marginRight: 20,
    marginBottom: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
   footer: {
    flex: 0.3,
    backgroundColor: '#E91E63',
    alignItems: 'center',
    marginTop: 4,
    justifyContent: 'center'
  },
  box8: {
    flex: 3.5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'column',
 
  },
  image1: {
    height: 180,
    width: 180
  },
  image2: {
    height: 99,
    width: 99
  },
  text: {
    textAlign: 'left',
    width: 300,
    marginTop: 5,
    marginRight: 10,
    marginLeft: 15,
    backgroundColor: '#FF80AB'
  },
  text2: {
    //textAlign: 'left',
    width: 300,
    marginTop: 5,
    marginRight: 10,
    marginLeft: 15,
    backgroundColor: 'white'
  },
  text3: {
    //textAlign: 'left',
    width: 300,
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    fontSize: 15,
    backgroundColor: 'white'
  },
  input: {
    height: 40,
    width: 300,
    marginTop: 5,
    textAlign: 'center',
    marginRight: 12,
    marginLeft: 15,
    backgroundColor: 'white'
  },
  input2: {
    height: 140,
    width: 300,
    marginTop: 5,
    textAlign: 'center',
    marginRight: 12,
    marginLeft: 15,
    backgroundColor: 'white'
  },
  ActivityIndicatorStyle:{
      
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    
  },
});
