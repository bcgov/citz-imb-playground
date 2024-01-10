import { equal, deepEqual } from "node:assert";
import { describe, test } from "node:test";
import { getCurrentDateTime } from "./getCurrentDateTime";

describe("getCurrentDateTime", () => {
  test("should return the current date and time in both UTC and Pacific time zones", () => {
    const result = getCurrentDateTime();

    // Extract and parse the UTC date and time from the result
    const utcDateParts = result.formattedDateUTC.split("-").map(Number);
    const utcTimeParts = result.formattedTimeUTC.split(":").map(Number);

    // Extract and parse the Pacific date and time from the result
    const pacificDateParts = result.formattedDatePacific.split("-").map(Number);
    const pacificTimeParts = result.formattedTimePacific.split(":").map(Number);

    // Get the current date and time in UTC
    const now = new Date();
    const yearUTC = now.getUTCFullYear();
    const monthUTC = now.getUTCMonth() + 1;
    const dayUTC = now.getUTCDate();
    const hoursUTC = now.getUTCHours();
    const minutesUTC = now.getUTCMinutes();
    const secondsUTC = now.getUTCSeconds();

    // Assert the UTC date and time
    deepEqual(utcDateParts, [yearUTC, monthUTC, dayUTC]);
    deepEqual(utcTimeParts, [hoursUTC, minutesUTC, secondsUTC]);

    // Calculate the Pacific date and time
    const pacificFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const pacificParts = pacificFormatter.formatToParts(now);

    const yearPacific = Number(
      pacificParts.find((part) => part.type === "year")?.value
    );
    const monthPacific = Number(
      pacificParts.find((part) => part.type === "month")?.value
    );
    const dayPacific = Number(
      pacificParts.find((part) => part.type === "day")?.value
    );
    const hoursPacific = Number(
      pacificParts.find((part) => part.type === "hour")?.value
    );
    const minutesPacific = Number(
      pacificParts.find((part) => part.type === "minute")?.value
    );
    const secondsPacific = Number(
      pacificParts.find((part) => part.type === "second")?.value
    );

    // Assert the Pacific date and time
    deepEqual(pacificDateParts, [yearPacific, monthPacific, dayPacific]);
    deepEqual(pacificTimeParts, [hoursPacific, minutesPacific, secondsPacific]);

    // Assert the Pacific time zone
    const nowPacific = new Date(
      result.formattedDatePacific + "T" + result.formattedTimePacific + "Z"
    );
    const utcOffset = nowPacific.getTime() - now.getTime();
    const isDST = utcOffset > 0 && utcOffset <= 3600000;
    const expectedTimeZone = isDST ? "PT" : "PST";
    equal(result.pacificTimeZone, expectedTimeZone);
  });
});
