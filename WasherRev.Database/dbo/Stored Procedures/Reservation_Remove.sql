CREATE PROCEDURE Reservation_Remove(
	@Id int
)
AS
BEGIN
	UPDATE [dbo].[Reservation]
	SET 
		IsDeleted = 1
	WHERE Id = @Id
END