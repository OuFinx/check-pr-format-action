"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("@actions/core");
var github = require("@actions/github");
function checkPullRequestFormat() {
    var workFlowPaylod = github.context.payload;
    var pullRequest = github.context.payload.pull_request;
    // Log the actual workflow payload for debugging
    core.info("Workflow payload " + JSON.stringify(workFlowPaylod));
    if (!!pullRequest == false) {
        // Checks can only be performed when it is a pull request.
        return;
    }
    var body = pullRequest === null || pullRequest === void 0 ? void 0 : pullRequest.body;
    if (!!body === false) {
        core.info("No pull request body. ");
        core.setFailed("No pull request body.");
        return;
    }
    var checks = core.getInput('checks');
    if (!!checks === false) {
        core.setOutput('status', false);
        core.setFailed('No checks.');
    }
    else {
        // Checks are a JSON array.
        var parsedChecks = JSON.parse(checks);
        var result = _checkPullRequestFormat(parsedChecks, body);
        if (result) {
            core.info("PR Format checks passed.");
            core.setOutput('status', true);
        }
        else {
            core.info("PR Format checks failed.");
            core.setOutput('status', false);
            core.setFailed("The pull request " + body + " does not match one of the following checks " + checks);
        }
    }
}
function _checkPullRequestFormat(expressions, body) {
    var lines = body.split(RegExp('\r?\n'));
    var compiled = [];
    var matches = 0;
    // Indexes
    var i = 0;
    var j = 0;
    // Compile Expressions
    for (i = 0; i < expressions.length; i += 1) {
        compiled[i] = new RegExp(expressions[i]);
    }
    // Validate
    for (i = 0; i < lines.length; i += 1) {
        var matched = false;
        for (j = 0; j < compiled.length && matched === false; j += 1) {
            matched = compiled[j].test(lines[i]);
        }
        if (matched) {
            matches += 1;
        }
    }
    return matches > 0;
}
(function () {
    try {
        checkPullRequestFormat();
    }
    catch (error) {
        core.setFailed("Unable to validate pull request body " + error);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBdUM7QUFDdkMsd0NBQTJDO0FBRTNDLFNBQVMsc0JBQXNCO0lBQzdCLElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQzlDLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUV4RCxnREFBZ0Q7SUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBb0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUcsQ0FBQyxDQUFDO0lBRWhFLElBQUksQ0FBQyxDQUFDLFdBQVcsSUFBSSxLQUFLLEVBQUU7UUFDMUIsMERBQTBEO1FBQzFELE9BQU87S0FDUjtJQUVELElBQU0sSUFBSSxHQUFHLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLENBQUM7SUFDL0IsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3hDLE9BQU87S0FDUjtJQUVELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQzlCO1NBQU07UUFDTCwyQkFBMkI7UUFDM0IsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQWEsQ0FBQztRQUNsRCxJQUFNLE1BQU0sR0FBRyx1QkFBdUIsQ0FBQyxZQUFZLEVBQUUsSUFBTSxDQUFDLENBQUM7UUFDN0QsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFvQixJQUFJLG9EQUErQyxNQUFRLENBQUMsQ0FBQztTQUNqRztLQUNGO0FBQ0gsQ0FBQztBQUVELFNBQVMsdUJBQXVCLENBQUMsV0FBcUIsRUFBRSxJQUFZO0lBQ2xFLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDMUMsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNoQixVQUFVO0lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1Ysc0JBQXNCO0lBQ3RCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxQztJQUNELFdBQVc7SUFDWCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNwQyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1RCxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QztRQUNELElBQUksT0FBTyxFQUFFO1lBQ1gsT0FBTyxJQUFJLENBQUMsQ0FBQztTQUNkO0tBQ0Y7SUFDRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDO0FBQ3JDLENBQUM7QUFHRCxDQUFDO0lBQ0MsSUFBSTtRQUNGLHNCQUFzQixFQUFFLENBQUM7S0FDMUI7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsMENBQXdDLEtBQU8sQ0FBQyxDQUFDO0tBQ2pFO0FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb3JlID0gcmVxdWlyZSgnQGFjdGlvbnMvY29yZScpO1xuaW1wb3J0IGdpdGh1YiA9IHJlcXVpcmUoJ0BhY3Rpb25zL2dpdGh1YicpO1xuXG5mdW5jdGlvbiBjaGVja1B1bGxSZXF1ZXN0Rm9ybWF0KCk6IHZvaWQge1xuICBjb25zdCB3b3JrRmxvd1BheWxvZCA9IGdpdGh1Yi5jb250ZXh0LnBheWxvYWQ7ICBcbiAgY29uc3QgcHVsbFJlcXVlc3QgPSBnaXRodWIuY29udGV4dC5wYXlsb2FkLnB1bGxfcmVxdWVzdDtcblxuICAvLyBMb2cgdGhlIGFjdHVhbCB3b3JrZmxvdyBwYXlsb2FkIGZvciBkZWJ1Z2dpbmdcbiAgY29yZS5pbmZvKGBXb3JrZmxvdyBwYXlsb2FkICR7SlNPTi5zdHJpbmdpZnkod29ya0Zsb3dQYXlsb2QpfWApO1xuXG4gIGlmICghIXB1bGxSZXF1ZXN0ID09IGZhbHNlKSB7XG4gICAgLy8gQ2hlY2tzIGNhbiBvbmx5IGJlIHBlcmZvcm1lZCB3aGVuIGl0IGlzIGEgcHVsbCByZXF1ZXN0LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGJvZHkgPSBwdWxsUmVxdWVzdD8uYm9keTtcbiAgaWYgKCEhYm9keSA9PT0gZmFsc2UpIHtcbiAgICBjb3JlLmluZm8oYE5vIHB1bGwgcmVxdWVzdCBib2R5LiBgKTtcbiAgICBjb3JlLnNldEZhaWxlZChgTm8gcHVsbCByZXF1ZXN0IGJvZHkuYCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGNoZWNrcyA9IGNvcmUuZ2V0SW5wdXQoJ2NoZWNrcycpO1xuICBpZiAoISFjaGVja3MgPT09IGZhbHNlKSB7XG4gICAgY29yZS5zZXRPdXRwdXQoJ3N0YXR1cycsIGZhbHNlKTtcbiAgICBjb3JlLnNldEZhaWxlZCgnTm8gY2hlY2tzLicpO1xuICB9IGVsc2Uge1xuICAgIC8vIENoZWNrcyBhcmUgYSBKU09OIGFycmF5LlxuICAgIGxldCBwYXJzZWRDaGVja3MgPSBKU09OLnBhcnNlKGNoZWNrcykgYXMgc3RyaW5nW107XG4gICAgY29uc3QgcmVzdWx0ID0gX2NoZWNrUHVsbFJlcXVlc3RGb3JtYXQocGFyc2VkQ2hlY2tzLCBib2R5ISEpO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIGNvcmUuaW5mbyhgUFIgRm9ybWF0IGNoZWNrcyBwYXNzZWQuYCk7XG4gICAgICBjb3JlLnNldE91dHB1dCgnc3RhdHVzJywgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvcmUuaW5mbyhgUFIgRm9ybWF0IGNoZWNrcyBmYWlsZWQuYCk7XG4gICAgICBjb3JlLnNldE91dHB1dCgnc3RhdHVzJywgZmFsc2UpO1xuICAgICAgY29yZS5zZXRGYWlsZWQoYFRoZSBwdWxsIHJlcXVlc3QgJHtib2R5fSBkb2VzIG5vdCBtYXRjaCBvbmUgb2YgdGhlIGZvbGxvd2luZyBjaGVja3MgJHtjaGVja3N9YCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIF9jaGVja1B1bGxSZXF1ZXN0Rm9ybWF0KGV4cHJlc3Npb25zOiBzdHJpbmdbXSwgYm9keTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IGxpbmVzID0gYm9keS5zcGxpdChSZWdFeHAoJ1xccj9cXG4nKSk7XG4gIGNvbnN0IGNvbXBpbGVkID0gW107XG4gIGxldCBtYXRjaGVzID0gMDtcbiAgLy8gSW5kZXhlc1xuICBsZXQgaSA9IDA7XG4gIGxldCBqID0gMDtcbiAgLy8gQ29tcGlsZSBFeHByZXNzaW9uc1xuICBmb3IgKGkgPSAwOyBpIDwgZXhwcmVzc2lvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb21waWxlZFtpXSA9IG5ldyBSZWdFeHAoZXhwcmVzc2lvbnNbaV0pO1xuICB9XG4gIC8vIFZhbGlkYXRlXG4gIGZvciAoaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGxldCBtYXRjaGVkID0gZmFsc2U7XG4gICAgZm9yIChqID0gMDsgaiA8IGNvbXBpbGVkLmxlbmd0aCAmJiBtYXRjaGVkID09PSBmYWxzZTsgaiArPSAxKSB7XG4gICAgICBtYXRjaGVkID0gY29tcGlsZWRbal0udGVzdChsaW5lc1tpXSk7XG4gICAgfVxuICAgIGlmIChtYXRjaGVkKSB7XG4gICAgICBtYXRjaGVzICs9IDE7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb21waWxlZC5sZW5ndGggPT09IG1hdGNoZXM7XG59XG5cblxuKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBjaGVja1B1bGxSZXF1ZXN0Rm9ybWF0KCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29yZS5zZXRGYWlsZWQoYFVuYWJsZSB0byB2YWxpZGF0ZSBwdWxsIHJlcXVlc3QgYm9keSAke2Vycm9yfWApO1xuICB9XG59KSgpO1xuIl19