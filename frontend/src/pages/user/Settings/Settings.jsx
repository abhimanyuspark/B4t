import Container from '../../../components/common/Container'
import SwitchMode from '../../../components/@comp/SwitchMode'

const Settings = () => {
  return (
    <Container>
        <h1 className='text-3xl font-bold'>Settings</h1>
        <br />
        <SwitchMode className="flex gap-2 items-center cursor-pointer border border-gray-200 rounded hover:bg-gray-100 p-2" />
    </Container>
  )
}

export default Settings
