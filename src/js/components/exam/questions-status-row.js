import React from 'react';

export default class QuestionsStatusRow extends React.Component {
  render() {

    let className = this.props.isCurrent ? 'bold' : ''
    const q = this.props.question

    switch (q.leitnerCat) {
      case 1:
        className += " danger"
        break
      case 2:
        className += " warning"
        break
      case 3:
        className += " success"
        break
      default:
        className += ""
    }

    var ans = []
    if (q.answers)
      q.answers.forEach(a => ans.push(a.answer))

    return (
      <tr className={className}>
        <td>{q.id}</td>
        <td>{q.value}</td>
        <td>{q.meaning}</td>
        <td>{q.difficulty}</td>
        <td>{ans.join()}</td>
        <td>{q.repeat}</td>
        <td>{q.leitnerCat}</td>
        <td>{q.flag && q.flag.toString()}</td>
      </tr>
    );
  }
}
