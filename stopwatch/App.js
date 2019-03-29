import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment'

const data = {
  timer: 1234567,
  laps: [134512, 254341, 354321, 423451]
}

function Timer({ interval, style }) {
  const duration = moment.duration(interval)
  const centiSeconds = Math.floor(duration.milliseconds() / 10)
  return (
    <Text style={style}>
      {duration.minutes()}:{duration.seconds()}:{centiSeconds}
    </Text>
  )
}
function RoundButton({ title, color, background }) {
  return (
    <View style={[styles.button, { backgroundColor: background }]}>
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </View>
  )
}

function ButtonRow({ children }) {
  return (
    <View style={styles.buttonsRow}>{children}</View>
  )
}

function Lap({ number, interval, fastest, slowest }) {
  const lapStyle = [
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest
  ]
  return (
    <View style={styles.laps}>
      <Text style={lapStyle}>Lap {number}</Text>
      <Timer style={lapStyle} interval={interval}></Timer>
    </View>
  )
}

function LapsTable({ laps }) {
  const finishedLaps = laps.slice(1)
  let min = Number.MAX_SAFE_INTEGER
  let max = Number.MIN_SAFE_INTEGER
  if (finishedLaps.length >= 2) {
    finishedLaps.forEach(lap => {
      if (lap < min) min = lap
      if (lap > max) max = lap
    })
  }
  return (
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) => (
        <Lap key={laps.length - index}
          number={index}
          interval={lap}
          fastest={lap === min}
          slowest={lap === max} />
      ))}
    </ScrollView>
  )
}
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Timer interval={data.timer} style={styles.timer} />
        <ButtonRow>
          <RoundButton title='Reset' color="#FFFFFF" background='#3D3D3D'></RoundButton>
          <RoundButton title='Start' color="#50D167" background='#1B361f'></RoundButton>
        </ButtonRow>
        <LapsTable laps={data.laps} />

      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    paddingTop: 130,
    paddingHorizontal: 20,
  },
  timer: {
    color: "#FFFFFF",
    fontSize: 76,
    fontWeight: "200",
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 18,
  },
  buttonBorder: {
    height: 76,
    width: 76,
    borderRadius: 38,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 80,
    marginBottom: 40
  },
  lapText: {
    color: '#FFFFFF',
    fontSize: 18,

  },
  laps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: "#151515",
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  scrollView: {
    alignSelf: 'stretch',
  },
  fastest: {
    color: '#50D167'
  },
  slowest: {
    color: '#CC3531'
  }
});
