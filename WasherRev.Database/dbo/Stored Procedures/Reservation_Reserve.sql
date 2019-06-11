CREATE PROCEDURE Reservation_Reserve(
	@ReservationId int,
	@UsersId int
)
AS
BEGIN
	UPDATE [dbo].[Reservation]
	SET [UsersId] = @UsersId
	WHERE [Id] = @ReservationId

	SELECT * FROM [dbo].[Reservation]
	WHERE [Id] = @ReservationId
END