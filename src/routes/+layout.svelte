<script>
	import '../app.css';
	import FloatingNavbar from '../lib/components/ui/floatingnavbar/floatingnavbar.svelte';
	import { Home, MessageCircle, User } from 'lucide-svelte';

	const navItems = [
		{
			name: 'Home',
			link: '/',
			icon: Home
		},
		{
			name: 'About',
			link: '/',
			icon: User
		},
		{
			name: 'Contact',
			link: '/',
			icon: MessageCircle
		}
	];
</script>

<!-- <FloatingNavbar {navItems} /> -->
<slot></slot>
