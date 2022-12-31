// https://shanabrian.com/web/javascript/time-math.php
var timeMath = {
	/**
	 * 加算
	 */
	sum : function() {
		var result, times, second,
			len = arguments.length;

		if (len === 0) return;

		for (var i = 0; i < len; i++) {
			if (!arguments[i] || !arguments[i].match(/^[0-9]+:[0-9]{2}:[0-9]{2}$/)) continue;

			times = arguments[i].split(':');

			second = this.toSecond(times[0], times[1], times[2]);

			if ((!second && second !== 0)) continue;

			if (i === 0) {
				result = second;
			} else {
				result += second;
			}
		}

		return this.toTimeFormat(result);
	},

	/**
	 * 減算
	 */
	sub : function() {
		var result, times, second,
			len = arguments.length;

		if (len === 0) return;

		for (var i = 0; i < len; i++) {
			if (!arguments[i] || !arguments[i].match(/^[0-9]+:[0-9]{2}:[0-9]{2}$/)) continue;

			times = arguments[i].split(':');

			second = this.toSecond(times[0], times[1], times[2]);

			if (!second) continue;

			if (i === 0) {
				result = second;
			} else {
				result -= second;
			}
		}

		return this.toTimeFormat(result);
	},

	/**
	 * 乗算
	 */
	multiply : function() {
		var result, times, second,
			len = arguments.length;

		if (len === 0) return;

		for (var i = 0; i < len; i++) {
			if (!arguments[i] || !arguments[i].match(/^[0-9]+:[0-9]{2}:[0-9]{2}$/)) continue;

			times = arguments[i].split(':');

			second = this.toSecond(times[0], times[1], times[2]);

			if (!second) continue;

			if (i === 0) {
				result = second;
			} else {
				result *= second;
			}
		}

		return this.toTimeFormat(result);
	},

	/**
	 * 除算
	 */
	division : function() {
		var result, times, second,
			len = arguments.length;

		if (len === 0) return;

		for (var i = 0; i < len; i++) {
			if (!arguments[i] || !arguments[i].match(/^[0-9]+:[0-9]{2}:[0-9]{2}$/)) continue;

			times = arguments[i].split(':');

			second = this.toSecond(times[0], times[1], times[2]);

			if (!second) continue;

			if (i === 0) {
				result = second;
			} else {
				result /= second;
			}
		}

		return this.toTimeFormat(result);
	},

	/**
	 * 時間を秒に変換
	 */
	toSecond : function(hour, minute, second) {
		if ((!hour && hour !== 0) || (!minute && minute !== 0) || (!second && second !== 0) ||
			hour === null || minute === null || second === null ||
			typeof hour === 'boolean' ||
			typeof minute === 'boolean' ||
			typeof second === 'boolean' ||
			typeof Number(hour) === 'NaN' ||
			typeof Number(minute) === 'NaN' ||
			typeof Number(second) === 'NaN') return;

		return (Number(hour) * 60 * 60) + (Number(minute) * 60) + Number(second);
	},

	/**
	 * 秒を時間（hh:mm:ss）のフォーマットに変換
	 */
	toTimeFormat : function(fullSecond) {
		var hour, minute, second;

		if ((!fullSecond && fullSecond !== 0) || !String(fullSecond).match(/^[\-0-9][0-9]*?$/)) return;

		var paddingZero = function(n) {
			return (n < 10)  ? '0' + n : n;
		};

		hour   = Math.floor(Math.abs(fullSecond) / 3600);
		minute = Math.floor(Math.abs(fullSecond) % 3600 / 60);
		second = Math.floor(Math.abs(fullSecond) % 60);

		minute = paddingZero(minute);
		second = paddingZero(second);

		return ((fullSecond < 0) ? '-' : '') + hour + ':' + minute + ':' + second;
	}
};
