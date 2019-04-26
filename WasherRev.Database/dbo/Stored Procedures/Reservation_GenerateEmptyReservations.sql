CREATE PROCEDURE Reservation_GenerateEmptyReservations(
	@Date datetime = null --if null will chanerate for the next month from now
)
AS
BEGIN
	DECLARE @lDate datetime = @Date
	IF @Date IS NULL
	BEGIN
		SET @lDate = DATEADD(m, 1, GETDATE())
	END

	DECLARE @WasherIds TABLE(
		WasherId int
	)

	INSERT INTO @WasherIds (WasherId)
	SELECT Id FROM [dbo].[Washer] w
	WHERE w.[SinceWhen] < @lDate
	AND 
	(w.[WorkedTo] IS NULL OR w.[WorkedTo] > @Date)


	DECLARE @Cursor CURSOR;
	DECLARE @Id int;

	BEGIN
		SET @Cursor = CURSOR FOR
		select * from @WasherIds

		OPEN @Cursor
		FETCH NEXT FROM @Cursor
		INTO @Id

		DECLARE @HourCounter INT = 1;
		DECLARE @DayCounter INT = 1;

		DECLARE @DaysInMonth INT = DAY(EOMONTH(@lDate));

		 --get id of washer
		WHILE @@FETCH_STATUS = 0
		BEGIN
			
			WHILE @DayCounter < @DaysInMonth+1
			BEGIN
				DECLARE @DateToInsert datetime = DATETIMEFROMPARTS(
					YEAR(@lDate),
					MONTH(@lDate),
					@DayCounter,
					8,
					0,
					0,
					0
				);
				WHILE @HourCounter < 8
					BEGIN

					BEGIN TRY
							INSERT INTO [dbo].[Reservation] VALUES(
							null,
							@DateToInsert,
							DATEADD(HOUR, 2, @DateToInsert),
							@Id
						)
					END TRY
					BEGIN CATCH
					END CATCH

						SET @DateToInsert = DATEADD(HOUR, 2, @DateToInsert);
						set @HourCounter = @HourCounter +1;
					END
				SET @HourCounter = 1;
				SET @DayCounter = @DayCounter + 1;
			END

			SET @DayCounter = 1
			FETCH NEXT FROM @Cursor
			INTO @Id
		END

		CLOSE @Cursor;
		DEALLOCATE @Cursor;

	END

END