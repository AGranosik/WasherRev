CREATE PROCEDURE Room_Insert(

	@Name varchar(MAX),
	@Floor int,
	@Capacity int,
	@BuildingId int,
	@IsActive bit
)
AS
BEGIN
	INSERT INTO [DBO].[Room] VALUES(
		@Name,
		@Floor,
		@Capacity,
		@BuildingId,
		@IsActive
	)

	SELECT SCOPE_IDENTITY()
END