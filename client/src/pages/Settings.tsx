import SettingsDetailsForm from '../components/settings/SettingsDetailsForm';
import SettingsPasswordForm from '../components/settings/SettingsPasswordForm';
import useAuthVerify from '../hooks/useAuthVerify';

function Settings() {
	useAuthVerify(true);

	return (
		<main className="settings">
			<SettingsDetailsForm />
			<SettingsPasswordForm />
		</main>
	);
}

export default Settings;
