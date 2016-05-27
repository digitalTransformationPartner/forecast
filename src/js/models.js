export function forecast5daysModel (data) {
	return {
		city: {
			name: data.city.name,
			country: data.city.country
		},
		dates: gruoupByDate(data.list)
	};
}

function gruoupByDate (list) {
	const dates = {};
	list.forEach(point => {
		const day = point.dt_txt.split(' ')[0];
		if (!dates[day]) {
			dates[day] = {
				date: day,
				list: []
			};
		}
		dates[day].list.push(point);
	});
	return Object.keys(dates).sort().map(date => dates[date]).slice(0, 5);
}
