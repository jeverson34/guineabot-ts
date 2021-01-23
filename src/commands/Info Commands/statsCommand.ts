import { RunFunction } from "../../interfaces/Command";
import formatBytes from "../../functions/formatBytes";
import os from "os";
import cpuStat from "cpu-stat";
import prettyMs from "pretty-ms";
import { memoryUsage } from "process";

export const run: RunFunction = async (client, message, args, prefix) => {
	var avgClockMHz = cpuStat.avgClockMHz();
	var cpuName = os.cpus()[0].model;
	var cpuCores = os.cpus().length;

	var osType = os.type();
	var osVersion = os.version();
	var osArch = os.arch();
	var osPlatform = os.platform();
	var osBuild = os.release();

	var clientUptime = prettyMs(message.client.uptime, {
		verbose: true,
		separateMilliseconds: true,
		formatSubMilliseconds: true,
		secondsDecimalDigits: 0,
	});

	var nodeVersion = process.version;

	var memUsage = formatBytes(process.memoryUsage().heapUsed);
	var memTotal = formatBytes(os.totalmem());

	var cpuStr = `__Model:__ ${cpuName}\n__Core Count:__ ${cpuCores}\n__Average Clock Speed:__ ${avgClockMHz} MHz\n`;
	var osStr = `__Name:__ ${osVersion}\n__Platform:__ ${osPlatform}\n__Build:__ ${osBuild}\n__Type:__ ${osType}\n__Architecture:__ ${osArch}`;
	var memoryStr = `__Total Memory:__ ${memTotal}\n__Memory Usage:__ ${memUsage}`;

	cpuStat.usagePercent(async (err, percent, seconds) => {
		if (err) {
			client.logger.error(err);
			return await message.channel.send(
				client.embed(
					{ description: `An error occurred: ${err.message}` },
					message
				)
			);
		}

		cpuStr += `__Usage:__ ${percent.toFixed(2)} %`;
		return await message.channel.send(
			client
				.embed({ title: "Guineabot Statistics" }, message)
				.addField("CPU Stats", cpuStr)
				.addField("Operating System", osStr)
				.addField("Memory Stats", memoryStr)
				.addField(
					"Client Stats",
					`__Uptime:__ ${clientUptime}\n__Node Version:__ ${nodeVersion}`
				)
		);
	});
};

export const name: string = "stats";
export const category: string = "Information";
export const description: string = "Guineabot host stats";
