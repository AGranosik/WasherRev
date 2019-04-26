CREATE PROCEDURE Reservation_GetForUser(
	@Date datetime,
	@BuildingId int
)
AS
BEGIN
	DECLARE @Washer TABLE(
		Id int
		);

	insert into @Washer
	select w.Id FROM [dbo].[Washer] w
	INNER JOIN [dbo].[Room] r ON r.Id = w.RoomId
	where r.[BuildingId] = @BuildingId

	SELECT * FROM [dbo].[Reservation] r
	INNER JOIN @Washer w ON w.Id = r.WasherId
	WHERE r.[UsersId] IS NULL
	AND
	YEAR(@Date) = YEAR(r.[StartTime])
	AND
	MONTH(@Date) = MONTH(r.[StartTime])
	AND
	DAY(@Date) = DAY(r.[StartTime])
END