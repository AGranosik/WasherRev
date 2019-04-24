CREATE PROCEDURE Producer_Insert(
	@Name VARCHAR(MAX),
	@ServicePhoneNo VARCHAR(50)
)
AS
BEGIN
	INSERT INTO [dbo].[Producer] VALUES
	(@Name,
	@ServicePhoneNo)
END