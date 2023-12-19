import styles from './CheckBoxGroup.module.scss'


function CheckboxGroup({ options=[], value, onChange }) {
    const handleChange = (event) => {
        const { checked, value: checkboxValue } = event.target;
        let newValue = [...value];
        if (checked) {
          newValue.push(checkboxValue);
        } else {
          newValue = newValue.filter(item => item !== checkboxValue);
        }
        onChange(newValue);
      };
  
    return (
      <div>
        {options.map(option => (
          <label className={styles.checkbox} key={option}>
            <input  type="checkbox" value={option} checked={value.includes(option)} onChange={handleChange} />
            {option}
          </label>
        ))}
      </div>
    );
  }
  export default CheckboxGroup;