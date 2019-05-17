package io.pivhix.course;

import io.pivhix.topic.Topic;
//import io.pivhix.topic.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CourseController {

    @Autowired
    private CourseService courseService;

    @RequestMapping("/topics/{id}/courses")
    public List<Course> getAllCourses(@PathVariable String id){
  return courseService.getAllcourses(id);
    }

    @RequestMapping("/topics/{topicId}/courses/{id}")
    public Course getCourse(@PathVariable String id){
        return courseService.getcourse(id);
    }

    @RequestMapping(method= RequestMethod.POST, value="/topics/{topicId}/courses")
    public void addCourse(@RequestBody Course course, @PathVariable String topicId ){
        course.setTopic(new Topic(topicId,"", ""));
        courseService.addcourse(course);

    }

    @PutMapping("/topics/{topicId}/courses/{id}")
    public void updateCourse(@RequestBody Course course, @PathVariable String topicId){
        course.setTopic(new Topic(topicId,"", ""));
        courseService.updatecourse(course);

    }

    @DeleteMapping("/topics/{topicId}/courses/{id}")
    public void deleteCourse(@PathVariable String id){
        courseService.deletecourse(id);

    }
}
